interface Iaddress {
    location: string;
    city: string;
    state: string;
    zipCode: string;
    landMark: string;
    latitute: string;
    longitude: string;
  }
export default interface IUSER {
     _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: Iaddress;
    otp?: Number;
    status: string;
    emailVerified?: Number;
    roles:string;
}