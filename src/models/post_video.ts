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
      videoType:{
        type:String,
        enum : ['youtube','dailymotion','local'],
        required: true
      },
      videoUrl:{
        type:String,
        required:true
      },
      createdAt: {type: Date, default: Date.now}
}
// import mongoose from "mongoose";
// import {nanoid} from "nanoid";
// const videoPostSchema =new mongoose.Schema({
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
//   videoType:{
//     type:String,
//     enum : ['youtube','dailymotion','local'],
//     required: true
//   },
//   videoUrl:{
//     type:String,
//     required:true
//   }
// },{timestamps:true})
// const videopostdb=mongoose.model('videopostdb',videoPostSchema)
// export default videopostdb;