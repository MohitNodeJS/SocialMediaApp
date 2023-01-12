import otp from "../../utils/helpers/otp";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import * as ISchoolServices from "./ISchoolServices";
import { IAppServiceProxy } from "../app_service_proxy";
import SchoolStore from "./school.store";
import STATUS_CODES from "../../utils/enum/StatusCodesEnum";
import ISCHOOL from "../../utils/interface/school/ISchool"
import { toError } from "../../utils/interface/common";
import ErrorMessageEnum from "../../utils/enum/errorMessageEnum";
import Joi from "joi";
class SchoolService implements ISchoolServices.ISchoolServiceAPI {
  private schoolStore = new SchoolStore();
  private proxy: IAppServiceProxy;
  constructor(proxy: IAppServiceProxy) {
    this.proxy = proxy;
  }


  
    // User Register API_1
    public schoolRegistor = async (
      request: ISchoolServices.IRegisterSchoolRequest
    ): Promise<ISchoolServices.IRegisterSchoolResponse> => {
      const response: ISchoolServices.IRegisterSchoolResponse = {
        status: STATUS_CODES.UNKNOWN_CODE,
        message: "",
      };
  
      const schema = Joi.object().keys({
        schoolName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        address: Joi.object({
          city: Joi.string().max(15).optional(),
          state: Joi.string().max(15).optional(),
        }).optional(),
        role: Joi.string().optional(),
      });
      const params = schema.validate(request);
  
      if (params.error) {
        response.status = STATUS_CODES.UNPROCESSABLE_ENTITY;
        response.error = toError(params.error.details[0].message);
        return response;
      }
      const {  schoolName,
        email,
        password,
        address,
        role } =
        params.value;
  
      // Check if email is already registered
      let school: ISCHOOL;
      try {
        const existingUser = await this.schoolStore.findOneData({ email });
  
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
      const attributes: ISCHOOL = {
        schoolName,
          email,
          password:passwordhash,
          address,
          role,
      };
  
     
      
      // save
      let schoolData: ISCHOOL;
      try {
        schoolData = await this.schoolStore.schoolRegistor(attributes);
        console.log(schoolData,"schoolData data service");
        
      } catch (e) {
        console.error(e);
        response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
        response.error = toError(e.message);
        return response;
      }
      response.status = STATUS_CODES.OK;
      response.message = "Success";
      response.school = schoolData;
      console.log(response,"service response");
      
      return response;
    };

    //LogIn_USER API_3
  public login = async (
    request: ISchoolServices.ILoginSchoolRequest
  ): Promise<ISchoolServices.ILoginSchoolResponse> => {
    const response: ISchoolServices.ILoginSchoolResponse = {
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

    let data: ISCHOOL;
    let token;
    try {
      //get user bu email id to check it exist or not
      data = await this.schoolStore.findOneData({ email });

      token = await jwt.sign({ _id: data._id, roles: data.role }, "mykey", {
        expiresIn: "1d",
      });

     

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
    response.school = data;
    return response;
  };

}
export default SchoolService;
