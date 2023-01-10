import otp from "../../utils/helpers/otp";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import * as IUserServices from "./IUserServices";
import { IAppServiceProxy } from "../app_service_proxy";
import UserStore from "./user.store";
import STATUS_CODES from "../../utils/enum/StatusCodesEnum";
import IUSER from "src/utils/interface/IUser";
import { toError } from "../../utils/interface/common";
import ErrorMessageEnum from "../../utils/enum/errorMessageEnum";
import Joi from "joi";
class UserServices implements IUserServices.IUserServiceAPI {
  private userStore = new UserStore();
  private proxy: IAppServiceProxy;
  constructor(proxy: IAppServiceProxy) {
    this.proxy = proxy;
  }

  // User Register API_1
  public userRegister = async (
    request: IUserServices.IuserRegister
  ): Promise<IUserServices.IRegisterUserResponse> => {
    const response: IUserServices.IRegisterUserResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
      message: "",
    };

    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      address: Joi.object({
        location: Joi.string().max(15).optional(),
        city: Joi.string().max(15).optional(),
        state: Joi.string().max(15).optional(),
        zipCode: Joi.string().max(15).optional(),
        landMark: Joi.string().max(15).optional(),
        latitute: Joi.string().max(15).optional(),
        longitude: Joi.string().max(15).optional(),
      }).optional(),
      status: Joi.string().optional(),
      roles:Joi.string().optional(),
    });
    const params = schema.validate(request);

    if (params.error) {
      response.status = STATUS_CODES.UNPROCESSABLE_ENTITY;
      response.error = toError(params.error.details[0].message);
      return response;
    }
    const { firstName, lastName, email, password, address, status ,roles} =
      params.value;

    // Check if email is already registered
    let existingUser: IUSER;
    try {
      const existingUser = await this.userStore.findOneData({ email });

      if (existingUser && existingUser?.email) {
        const errorMsg = ErrorMessageEnum.EMAIL_ALREADY_EXIST;
        response.status = STATUS_CODES.BAD_REQUEST;
        response.error = toError(errorMsg);
        return response;
      }
    } catch (e) {
      console.error(e);
      response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }

    /// password hash
    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(request.password, salt);
  

    //Save the user to storage
    const attributes: IUSER = {
      firstName,
      lastName,
      email,
      password: passwordhash,
      status,
      address,
      otp: otp(999999),
      roles,
    };

    // node mailer
    const transporter = await nodemailer.createTransport(
      smtpTransport({
        service: "Gmail",
        auth: {
          user: "mohitkajlawins@gmail.com",
          pass: "reodwygsergoiauy",
        },
      })
    );
    const mailOption = {
      to: request.email,
      from: "mohitkajlawins@gmail.com",
      subject: "node mailer OTP",
      html: `
     <div
       class="container"
       style="max-width: 90%; margin: auto; padding-top: 20px"
     >
       <h2>Welcome </h2>
       <h4>You are officially In ✔</h4>
       <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
       <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${attributes.otp}</h1>
  </div>`,
    };

    await transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        throw new Error("email not send check email");
      }
    });

    // save
    let user: IUSER;
    try {
      user = await this.userStore.userRegister(attributes);
    } catch (e) {
      console.error(e);
      response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }
    response.status = STATUS_CODES.OK;
    response.message = "Success";
    response.user = user;
    console.log(response, "service response");

    return response;
  };

  //Verfiy_Email API_2
  public verifyEmail = async (
    request: IUserServices.IUserVerifyRequest
  ): Promise<IUserServices.IUserVerifyResponse> => {
    const response: IUserServices.IUserVerifyResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
      email: "",
      otp: undefined,
      message: "",
    };

    // const schema = Joi.object().keys({
    //   email: Joi.string().email().required(),
    //   //otp: Joi.number().min(4).max(6).required(),
    // })
    //const params = schema.validate(request);
    // if (params.error) {
    //   console.error(params.error);
    // }
    const extUser = await this.userStore.findOneData({ email: request.email });
    if (!extUser) {
      const errorMsg = ErrorMessageEnum.EmailInvalid;
      response.status = STATUS_CODES.BAD_REQUEST;
      response.error = toError(errorMsg);
      return response;
    }
    if (extUser.emailVerified == 1) {
      const errorMsg = ErrorMessageEnum.Email_Allready_Verified;
      response.status = STATUS_CODES.BAD_REQUEST;
      response.error = toError(errorMsg);
      return response;
    }
    const userOTP = request.otp;

    // compaire otp for input and existing otp in db
    if (extUser.otp !== userOTP) {
      const errorMsg = ErrorMessageEnum.Invalid_Otp;
      response.status = STATUS_CODES.BAD_REQUEST;
      response.error = toError(errorMsg);
      return response;
    }

    let updateVerifyCheck: IUSER;
    try {
      updateVerifyCheck = await this.userStore.findOneDataAndUpdate(
        { email: request?.email },
        { emailVerified: 1 }
      );
    } catch (e) {
      console.error(e);
      response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }
    response.status = STATUS_CODES.OK;
    response.user = updateVerifyCheck;
    response.message = "Success";
    return response;
  };

  //LogIn_USER API_3
  public login = async (
    request: IUserServices.ILoginUserRequest
  ): Promise<IUserServices.ILoginUserResponse> => {
    const response: IUserServices.ILoginUserResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
    };
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const params = schema.validate(request);

    if (params.error) {
      console.error(params.error);
      response.status = STATUS_CODES.UNPROCESSABLE_ENTITY;
      response.error = toError(params.error.details[0].message);
      return response;
    }
    const { email, password } = params.value;

    let data: IUSER;
    let token;
    try {
      //get user bu email id to check it exist or not
      data = await this.userStore.findOneData({ email,  });

      token = await jwt.sign({ _id: data._id ,roles:data.roles}, "mykey", {
        expiresIn: "1d",
      });

      // check email is verified or not
      if (data.emailVerified == 0) {
        //throw new Error("Email is not verified");
        const errorMsg = ErrorMessageEnum.Email_Not_Verified;
        response.status = STATUS_CODES.UNAUTHORIZED;
        response.error = toError(errorMsg);
        return response;
      }

      //if credentials are incorrect
      if (!data) {
        const errorMsg = ErrorMessageEnum.INVALID_CREDENTIALS;
        response.status = STATUS_CODES.UNAUTHORIZED;
        response.error = toError(errorMsg);
        return response;
      }
    } catch (e) {
      console.error(e);
      response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }

    //comparing password to insure that password is correct
    const isValid = await bcrypt.compare(password, data?.password);

    //if isValid or user.password is null
    if (!isValid || !data?.password) {
      const errorMsg = ErrorMessageEnum.INVALID_CREDENTIALS;
      response.status = STATUS_CODES.UNAUTHORIZED;
      response.error = toError(errorMsg);
      return response;
    }
    response.status = STATUS_CODES.OK;
    response.message = "Success";
    response.token = token;
    response.user = data;
    return response;
  };

  //resendVerifyEmail API_4
  public resendVerifyEmail = async (
    request: IUserServices.IResendVerifyEmailRequest
  ): Promise<IUserServices.IResendVerifyEmailResponse> => {
    const response: IUserServices.IResendVerifyEmailResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
      message: "",
    };

    const extUser: any = await this.userStore.findOneData({
      email: request?.email,
    });

    if (!extUser) {
      //throw new Error("Email dont exist");
      const errorMsg = ErrorMessageEnum.EmailInvalid;
      response.status = STATUS_CODES.BAD_REQUEST;
      response.error = toError(errorMsg);
      return response;
    }

    // check email is verified or not
    if (extUser.emailVerified == 1) {
      //throw new Error("Ooops Email is verified");
      const errorMsg = ErrorMessageEnum.Email_Allready_Verified;
      response.status = STATUS_CODES.BAD_REQUEST;
      response.error = toError(errorMsg);
      return response;
    }

    // compare user input password with existing password
    const validPassword = await bcrypt.compare(
      request?.password,
      extUser.password
    );

    // in case of invalid password throw error
    if (!validPassword) {
      //throw new Error("Invalid Credentials ");
      const errorMsg = ErrorMessageEnum.Invalid_Credentials;
      response.status = STATUS_CODES.BAD_REQUEST;
      response.error = toError(errorMsg);
      return response;
    }
    const newOTP = otp(999999);


    // node mailer
    const transporter = await nodemailer.createTransport(
      smtpTransport({
        service: "Gmail",
        auth: {
          user: "mohitkajlawins@gmail.com",
          pass: "reodwygsergoiauy",
        },
      })
    );
    const mailOption = {
      to: request.email,
      from: "mohitkajlawins@gmail.com",
      subject: "node mailer OTP",
      html: `
          <div
            class="container"
            style="max-width: 90%; margin: auto; padding-top: 20px"
          >
            <h2>Welcome </h2>
            <h4>You are officially In ✔</h4>
            <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${newOTP}</h1>
       </div>`,
    };
    await transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        throw new Error("Email Error transporter");
      }
    });

    let data: IUSER;
    try {
      data = await this.userStore.findOneDataAndUpdate(
        { email: request?.email },
        { otp: newOTP }
      );
    } catch (e) {
      console.error(e);
      response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }

    response.status = STATUS_CODES.OK;
    response.user = data;
    response.message = "Success";
    return response;
  };

  // resetPassword
  public resetPassword = async (
    request: IUserServices.IResetPasswordRequest
  ): Promise<IUserServices.IResetPasswordResponse> => {
    const response: IUserServices.IResetPasswordResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
      data: undefined,
      email: "",
      otp: undefined,
      message: "",
    };
    try {
      const extUser: any = await this.userStore.findOneData({
        email: request.email,
      });

      //check if email exixt or not
      if (!extUser) {
        // throw new Error("Invalid Credentials ");
        const errorMsg = ErrorMessageEnum.Invalid_Credentials;
        response.status = STATUS_CODES.BAD_REQUEST;
        response.error = toError(errorMsg);
        return response;
      }

      //OTP form user input
      const userOTP = request.otp;
      let upwd = request.newPassword;
      const passwordhash = await bcrypt.hash(upwd, 10);
      upwd = passwordhash;

      // compaire otp for input and existing otp in db
      if (extUser.otp !== userOTP) {
        //throw new Error("invalid Otp");
        const errorMsg = ErrorMessageEnum.Invalid_Otp;
        response.status = STATUS_CODES.BAD_REQUEST;
        response.error = toError(errorMsg);
        return response;
      }

      let data: IUSER;
      try {
        const data = await this.userStore.findOneDataAndUpdate(
          { email: request.email },
          { password: upwd }
        );
      } catch (e) {
        console.error(e);
        response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
        response.error = toError(e.message);
        return response;
      }
      response.status = STATUS_CODES.OK;
      response.data = data;
      response.message = "Success";
      return response;
    } catch (e) {
      return e;
    }
  };

  //getProfile
  public getProfile = async (
    request: IUserServices.IGetUserRequest
  ): Promise<IUserServices.IGetUserResponse> => {
    const response: IUserServices.IGetUserResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
      message: "",
    };
    let user: IUSER;
    try {
      // user = await this.userStore.getByAttributes({ _id });
      const user = await this.userStore.findOneData({ _id: request?.userID });

      //if user's id is incorrect
      if (!user) {
        const errorMsg = ErrorMessageEnum.INVALID_USER_ID;
        response.status = STATUS_CODES.BAD_REQUEST;
        response.error = toError(errorMsg);
        return response;
      }
    } catch (e) {
      console.error(e);
      response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }
    response.status = STATUS_CODES.OK;
    response.user = user;
    response.message = "Success";
    return response;
  };
}
export default UserServices;
