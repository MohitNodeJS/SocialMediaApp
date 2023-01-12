import proxy from "../../../services/app_service_proxy";
import AuthMiddleware from "../../../utils/middleware/auth_middleware";
import STATUS_CODES from "../../../utils/enum/StatusCodesEnum";
import { ApolloError } from "apollo-server-express";
import  * as  ISchoolServices from "../../../services/school/ISchoolServices"
export default {
  Query: {
   //LogIn_USER API_3
   async loginSchool(parent, args) {
    const { email, password } = args;

    let request: ISchoolServices.ILoginSchoolRequest = {
      email,
      password,
    };

    let response: ISchoolServices.ILoginSchoolResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
    };

    try {
      let response = await proxy.school.login(request);

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
  },
  Mutation: {
    async schoolRegistor(parent, args) {
      const {
        schoolData: {
          schoolName,
          email,
          password,
          address,
          role,
        },
      } = args;
      console.log(args,"resolver");
      

      let request: ISchoolServices.IRegisterSchoolRequest = {
        schoolName,
        email,
        password,
        address,
        role,
      };

      let response: ISchoolServices.IRegisterSchoolResponse;

      try {
        response = await proxy.school.schoolRegistor(request);
        console.log(response,"resolver");
        
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
  },
};
