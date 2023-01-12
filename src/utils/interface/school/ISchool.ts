export interface IAddress {
  city: string;
  state: string;
}
export default interface ISCHOOL {
  _id?: string;
  schoolName: string;
  email: string;
  password: string;
  address: IAddress;
  role: string;
}
