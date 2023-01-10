import IUSER from "../../utils/interface/IUser";
import { IResponse } from "../../utils/interface/common";
export interface IUserServiceAPI {
  userRegister(request: IuserRegister): Promise<IRegisterUserResponse>;
  login(request: ILoginUserRequest): Promise<ILoginUserResponse>;
  verifyEmail(request: IUserVerifyRequest): Promise<IUserVerifyResponse>;
  resendVerifyEmail(
    request: IResendVerifyEmailRequest
  ): Promise<IResendVerifyEmailResponse>;
  resetPassword(
    request: IResetPasswordRequest
  ): Promise<IResetPasswordResponse>;
  getProfile(request: IGetUserRequest): Promise<IGetUserResponse>;
}
interface Iaddress {
  location: string;
  city: string;
  state: string;
  zipCode: string;
  landMark: string;
  latitute: string;
  longitude: string;
}
export interface IuserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: Iaddress;
  otp?: Number;
  status: string;
  roles: string;
}
export interface IRegisterUserResponse extends IResponse {
  message: string;
  user?: IUSER;
}
export interface IUserVerifyResponse extends IResponse {
  message: string;
  user?: IUSER;
  email: string;
  otp: Number;
}
export interface IUserVerifyRequest {
  email: string;
  otp: Number;
}
export interface IUserVerifyResponse {
  email: string;
  otp: Number;
}

export interface IUserLogin {
  email: string;
  password: string;
}
export interface IResendVerify {
  email: string;
  password: string;
}
export interface IForgetPassword {
  email: string;
}
export interface IResetPassword {
  email: string;
  newPassword: string;
  otp: Number;
}

export interface IGetProfile {
  idUser: string;
}

/********************************************************************************
 * Login
 ********************************************************************************/
export interface ILoginUserRequest {
  email: string;
  password: string;
}
export interface ILoginUserResponse extends IResponse {
  user?: IUSER;
  token?: string;
  message?: string;
}

/////////////////////////////////////////////////////
//resendVerifyEmail
//////////////////////////////////
export interface IResendVerifyEmailRequest {
  email: string;
  password: string;
}
export interface IResendVerifyEmailResponse extends IResponse {
  message: string;
  user?: IUSER;
}

///////////////////////////////////////////////
//resetPassword
///////////////////////////////////
export interface IResetPasswordRequest {
  email: string;
  newPassword: string;
  otp: Number;
}
export interface IResetPasswordResponse extends IResponse {
  message: string;
  data: IUSER;
  email: string;
  otp: Number;
}

///////////////////////////////
//get profile
///////////////////////////

export interface IGetUserRequest {
  userID: string;
}
export interface IGetUserResponse extends IResponse {
  message: string;
  user?: IUSER;
}
