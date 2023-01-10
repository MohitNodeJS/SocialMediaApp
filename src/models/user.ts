
import { nanoid } from "nanoid";
export default  {
  _id:{
      type:String,
      default:()=>nanoid(),
  },
  firstName:{
      type:String,
      required:false
  },
  lastName:{
      type:String,
      required:false
  },
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  address: {
      location:{
        type:String,
        required:false
      },
      
      city: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      zipCode: {
        type: String,
        required: false,
      },
      landMark:{
          type:String,
          required:false
      },
      latitute:{
        type:String,
        required:false
    },
    longitude:{
      type:String,
      required:false
  },
  },
  otp:{
    type:Number,
    required:false
  },
  emailVerified:{
    type:Number,
    enum:[0,1],
    default:0
  },
  status:{
    type:String,
    enum:['public','private'],
    default:'private'
  },
  roles:{
    type:String,
    enum:['admin','editor1','editor2'],
    default:'admin'
  },
  createdAt: {type: Date, default: Date.now}
 
};