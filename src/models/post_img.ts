import { nanoid } from "nanoid";
export default  {
  _id: {
        type: String,
        default: () => nanoid(),
      },
      userId: {
        type: String,
        required: true,
      },
      postId:{
        type: String,
        required: true,
      },
      title:{
        type:String,
        required: false,
      },
      description:{
        type:String,
        required: false
      },
      imgUrl:{
        type:String,
        required: false
      },
      createdAt: {type: Date, default: Date.now}
}
// import mongoose from "mongoose";
// import {nanoid} from "nanoid";
// const imgPostSchema =new mongoose.Schema({
//   _id: {
//     type: String,
//     default: () => nanoid(),
//   },
//   userId: {
//     type: String,
//     required: true,
//   },
//   postId:{
//     type: String,
//     required: true,
//   },
//   title:{
//     type:String,
//     required: false,
//   },
//   description:{
//     type:String,
//     required: false
//   },
//   imgUrl:{
//     type:String,
//     required: false
//   }
// },{timestamps:true})
// const imgpostdb=mongoose.model('imgpostdb',imgPostSchema)
// export default imgpostdb;