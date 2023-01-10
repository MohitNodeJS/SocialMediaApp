import { makeExecutableSchema } from "@graphql-tools/schema";
import userResolvers from "../graphql/resolvers/user_resolver";
import postResolvers from "../graphql/resolvers/user_posts_resolver"
import fileResolvers from "./resolvers/file_upload_resolver";
import { merge } from "lodash";
import gql from "graphql-tag";
// const typeDefs = `#graphql
// const typeDefs=gql`
const typeDefs=gql`
type File {
    filename:String!
    mimetype: String!
    encoding: String!
  }
type taddress{
    location: String!,
    city:String!,
    state:String!,
    zipCode:String!,
    landMark:String!,
    latitute:String!,
    longitude:String!,
    
}
enum status {
    public,
    private
}
type register{
    firstName:String!,
    lastName:String,
    email:String,
    password:String,
    address:taddress,
    status:String,
    roles:String,
}
type PostData{
    type:String,
    status:String,
}

type newOTP{
    status:String!,
    message:String,
    user:OTP
}
type OTP{
    otp:Int,
    email:String
    emailVerified:String,
    
},
type login {
    email:String,
    password:String,
    Token:String,
   },
type resendOTP{
    status:String!,
    message:String,
    emailVerified:String
}
type forgetPassword{
    otpStatus:String
}
type resetPassword{
    status:String!,
    message:String,
    resetPassword:String
}
enum poststatus {
    public,
    private,
    deleted
}
type userPost{
    type:String,
    status:String,
    message:String
}

type Authentication {
    status:String!,
    token: String!,
    user: register!,
    message:String,
  }

  type GetProfile{
    status:String,
    message:String,
    register:register,
  }

  input logInput{
   email:String,
   password:String,
}
type Query {
    # hello: String,
    verifyEmailOtp(OTP:iOTP):newOTP,
    login(email: String, password: String): Authentication
    # forgetPassword(forgetPassword:iforgetPassword):forgetPassword,
    
    getProfile:GetProfile,
    getAllUser:register,
    uploads: [File],
    getTimeLine:PostData,
    # verifyEmailOtp(OTP:iOTP):newOTP,
    # logInUser(login:logInput):login,

}
scalar FileUpload
enum videotype{
    youtube,
    dailymotion,
    local
}

input ifields{
    title:String!,
    description:String!,
    imgUrl:String,
    videoType:videotype,
    videoUrl:String,
}

enum etype {
    text,
    image,
    video,
}
# input iuserPost{
#     type:String,
#     status:String,
#     # fields:String!,
# }
input iuserPost{
    type:etype,
    fields:ifields,
    status:poststatus
}

input iresetPassword{
    email:String!,
    otp:Int,
    newPassword:String
}
input iforgetPassword{
    email:String!
}
input iresendOTP{
    email:String!,
    password:String!
}
input iOTP{
    email:String!,
    otp:Int!,
    # status:String!,
}
input iaddress{
    location:String,
    city:String,
    state:String,
    zipCode:String,
    landMark:String,
    latitute:String,
    longitude:String,
    
}
input iregister{
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    address:iaddress,
    status:status,
    roles:Roles,
},
enum Roles {
    admin,
    editor1,
    editor2,
}


input logInput {
    email:String!,
    password:String!,
  },

  type UserDeatils {
    status:String!,
    message:String!,
    user: register!,
  }
  input iUpdPost{
    id:String
    type:etype,
    fields:ifields,
    status:poststatus
}
type Mutation{
    # userRegistor(register:iregister):register,
    userRegistor(register:iregister):UserDeatils
    resendVerifyEmail(resendOTP:iresendOTP):resendOTP
    resetPassword(resetPassword:iresetPassword):resetPassword
    addPosts(userPost:iuserPost):userPost,

    updatePost(userPost:iUpdPost):userPost,
    singleUpload(file:FileUpload!):File!
    
  }  
`;

 export default typeDefs;

// export const userresolvers = merge(userResolvers);
// export const postresolvers=merge(postResolvers);
// export const fileresolver=merge(fileResolvers);
// export const typeDef=merge(typeDefs);
// export const executableSchema = makeExecutableSchema({
//   resolvers: { ...userresolvers,...postresolvers,...fileResolvers },
//   typeDefs
// });

