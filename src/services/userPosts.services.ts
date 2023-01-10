// import AuthMiddleware from "../utils/middleware/auth_middleware";
// import postsdb from "../models/user_post";
// import textpostdb from "../models/post_text";
// import imgpostdb from "../models/post_img";
// import videopostdb from "../models/post_video";
// import userDb from "../models/user";
// class UserPostsServices {
//   async addPosts(parent, args, context) {
//     try {
//       AuthMiddleware.Validattion(parent, args, context);
//       const idUser = context.user._id;

//       // const user = await userDb.findOne({ _id: idUser });
//       // if (!user) {
//       //   throw new Error("Invalid Credentials user not found");
//       // }
//       //switch case for type
//       // store in db
//       const postStatus = args.userPost.status;
//       const postType = args.userPost.type;
//       const postArgs = {
//         userId: idUser,
//         type: postType,
//         status: postStatus,
//       };
//       const newPost = new postsdb(postArgs);

//       const savePost = await newPost.save();

//       switch (postType) {
//         case "text":
//           try {
//             const textArgs = {
//               userId: idUser,
//               postId: savePost._id,
//               title: args.userPost.fields.title,
//               description: args.userPost.fields.description,
//             };
//             const newText = new textpostdb(textArgs);
//             const saveText = await newText.save();
//             break;
//           } catch (error) {
//             throw new Error("oops somthing went wrong while saving text");
//           }

//         case "image":
//           try {
//             const imgArgs = {
//               userId: idUser,
//               postId: savePost._id,
//               title: args.userPost.fields.title,
//               description: args.userPost.fields.description,
//               imgUrl: args.userPost.fields.imgUrl,
//             };
//             const newImg = new imgpostdb(imgArgs);
//             const saveImg = await newImg.save();
//             break;
//           } catch (error) {
//             throw new Error("oops somthing went wrong while saving image");
//           }

//         case "video":
//           try {
//             const videoArgs = {
//               userId: idUser,
//               postId: savePost._id,
//               title: args.userPost.fields.title,
//               description: args.userPost.fields.description,
//               videoUrl: args.userPost.fields.video.videoUrl,
//               videoType: args.userPost.fields.video.videoType,
//             };
//             const newVideo = new videopostdb(videoArgs);
//             const saveVideo = await newVideo.save();
//             break;
//           } catch (error) {
//             throw new Error("oops somthing went wrong while saving video");
//           }
//       }
//       return {
//         message: "successfully saved",
//       };
//     } catch (error) {
//       throw new Error("oops something went wrong ");
//     }
//   }
  
// }

// export default new UserPostsServices();
