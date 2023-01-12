import ISCHOOL from "../../utils/interface/school/ISchool";
import { IResponse } from "../../utils/interface/common";
export interface ISchoolServiceAPI {
    schoolRegistor(request: IRegisterSchoolRequest): Promise<IRegisterSchoolResponse>;
    login(request: ILoginSchoolRequest): Promise<ILoginSchoolResponse>;
}
export interface Iaddress {
  city: string;
  state: string;
}
export interface IRegisterSchoolRequest {
  schoolName: string;
  email: string;
  password: string;
  address: Iaddress;
  role: string;
}
export interface IRegisterSchoolResponse extends IResponse {
  message: string;
  school?: ISCHOOL;
}


/********************************************************************************
 * Login
 ********************************************************************************/
export interface ILoginSchoolRequest {
  email: string;
  password: string;
}
export interface ILoginSchoolResponse extends IResponse {
  school?: ISCHOOL;
  token?: string;
  message?: string;
}