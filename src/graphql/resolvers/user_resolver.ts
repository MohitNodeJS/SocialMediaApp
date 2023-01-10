import proxy from "../../services/app_service_proxy";
import * as IUserServices from "../../services/user/IUserServices";
import AuthMiddleware from "../../utils/middleware/auth_middleware";
import STATUS_CODES from "../../utils/enum/StatusCodesEnum";
import { ApolloError } from "apollo-server-express";
export default {
  Query: {
    //Verfiy_Email API_2
    async verifyEmailOtp(parent, args) {
      const {
        OTP: { email, otp },
      } = args;
      let request: IUserServices.IUserVerifyRequest = {
        email,
        otp,
      };

      let response: IUserServices.IUserVerifyResponse;
      try {
        response = await proxy.user.verifyEmail(request);
      } catch (e) {
        throw new Error("error");
      }
      return response;
    },

    //LogIn_USER API_3
    async login(parent, args) {
      const { email, password } = args;

      let request: IUserServices.ILoginUserRequest = {
        email,
        password,
      };

      let response: IUserServices.ILoginUserResponse = {
        status: STATUS_CODES.UNKNOWN_CODE,
      };

      try {
        let response = await proxy.user.login(request);

        if (response.status !== STATUS_CODES.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
        return response;
      } catch (e) {
        throw new Error("error");
      }
    },

    //Get PROFILE
    async getProfile(parent, args, context) {
      await AuthMiddleware.Validattion(context);
      const userID = context.user._id;

      let request: IUserServices.IGetUserRequest = { userID };
      let response: IUserServices.IGetUserResponse;
      try {
        response = await proxy.user.getProfile(request);
        return response;
      } catch (e) {
        throw e;
      }
    },
  },
  Mutation: {
    //userRegister
    async userRegistor(parent, args) {
      const {
        register: {
          firstName,
          lastName,
          email,
          password,
          address,
          status,
          roles,
        },
      } = args;

      let request: IUserServices.IuserRegister = {
        firstName,
        lastName,
        email,
        password,
        address,
        status,
        roles,
      };

      let response: IUserServices.IRegisterUserResponse;

      try {
        response = await proxy.user.userRegister(request);

        if (response.status !== STATUS_CODES.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }
      return response;
    },

    // resendVerifyEmail
    async resendVerifyEmail(parent, args) {
      const {
        resendOTP: { email, password },
      } = args;

      let request: IUserServices.IResendVerifyEmailRequest = {
        email,
        password,
      };
      let response: IUserServices.IResendVerifyEmailResponse;
      try {
        let response = await proxy.user.resendVerifyEmail(request);
        return response;
      } catch (e) {
        throw e;
      }
    },

    // resetPassword
    async resetPassword(parent, args) {
      const {
        resetPassword: { email, newPassword, otp },
      } = args;

      let request: IUserServices.IResetPasswordRequest = {
        email,
        newPassword,
        otp,
      };

      let response: IUserServices.IResetPasswordResponse;

      try {
        response = await proxy.user.resetPassword(request);
        return response;
      } catch (e) {
        throw e;
      }
    },
  },
};
