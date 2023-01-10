// import UserServices from "../../services/user/user.service";
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
       console.log(args,"args,resolver");
      let request:IUserServices.IUserVerifyRequest = {
        email,
        otp,
      };

       let response:IUserServices.IUserVerifyResponse;
      try {
         response = await proxy.user.verifyEmail(request);
        //console.log(response,"displayData resolver");
      } catch (e) {
        throw new Error("error");
      }
      return response;
    },

    //LogIn_USER API_3
    async login(parent, args) {
      const {
         email, password 
      } = args;
      console.log(args,"resolver 1");
      
      let request: IUserServices.ILoginUserRequest = {
        email,
        password,
      
      };
      console.log(request,"req resolver");
      

      let response: IUserServices.ILoginUserResponse = {
        status: STATUS_CODES.UNKNOWN_CODE,
      };
      console.log(response,"response reolver 111");
      
      try {
        let response = await proxy.user.login(request);
        console.log(response,"22222222");
        
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
      //console.log(response,"final response resolver");
      
      
    },


    //Get PROFILE
    async getProfile(parent, args, context) {
      await AuthMiddleware.Validattion(context);
      // /const userId = context.user._id;
      console.log(context.user._id,"userID resolvcacaccer");
      const userID = context.user._id;
      console.log(userID,"userID resolver");
      
      // let request: IUserServices.IGetProfile = { idUser };IGetUserRequest
      let request: IUserServices.IGetUserRequest = { userID };
      let response: IUserServices.IGetUserResponse;
      try {
         response = await proxy.user.getProfile(request);
         console.log(response,"responce resolver");
         
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
        register: { firstName, lastName, email, password, address, status,roles },
      } = args;
      console.log(args,"args console resolver");
      

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
        console.log(response,"resolver response checker");
        
        if (response.status !== STATUS_CODES.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }
      return response
      },

    // resendVerifyEmail
    async resendVerifyEmail(parent, args) {
      const {
        resendOTP: { email, password },
      } = args;
      //console.log(args, "resolver");

      let request: IUserServices.IResendVerifyEmailRequest = {
        email,
        password,
      };
      let response:IUserServices.IResendVerifyEmailResponse;
      try {
        let response = await proxy.user.resendVerifyEmail(request);
        //console.log(displayData)
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

      let response:IUserServices.IResetPasswordResponse;

      try {
         response = await proxy.user.resetPassword(request);
        return response;
      } catch (e) {
        throw e;
      }
    },

  }
}
// export default userResolvers;
