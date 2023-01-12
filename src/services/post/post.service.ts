import * as IPostServices from "./IPostService";
import { IAppServiceProxy } from "../app_service_proxy";
import PostStore, { ImagePostDb, TextPostDb, VideoPostDb } from "./post.store";
import UserStore from "../../services/user/user.store";
import STATUS_CODES from "../../utils/enum/StatusCodesEnum";
import IPOST from "../../utils/interface/IPost";
import { toError } from "../../utils/interface/common";
import ErrorMessageEnum from "../../utils/enum/errorMessageEnum";

class PostServices implements IPostServices.IPostServiceAPI {
  private userStore = new UserStore();
  private postStore = new PostStore();
  private proxy: IAppServiceProxy;
  constructor(proxy: IAppServiceProxy) {
    this.proxy = proxy;
  }

  //Add_Post
  // async addPosts(request: any) {
  //   const user = await this.userStore.findOneData({ _id: request.userId });

  //   if (!user) {
  //     throw new Error("Invalid Credentials user not found");
  //   }
  //   //switch case for type
  //   // store in db
  //   const postStatus = request.status;
  //   const postType = request.type;

  //   const postArgs = {
  //     userId: request.userId,
  //     type: postType,
  //     status: postStatus,
  //   };
  //   const savePost = await this.postStore.addPosts(postArgs);
  //   switch (postType) {
  //     case "text":
  //       try {
  //         const textArgs = {
  //           userId: request.userId,
  //           postId: savePost._id,
  //           title: request.fields.title,
  //           description: request.fields.description,
  //         };
  //         const saveTextPost = await this.postStore.addTextPosts(textArgs);
  //         break;
  //       } catch (error) {
  //         throw new Error("oops somthing went wrong while saving text");
  //       }

  //     case "image":
  //       try {
  //         const imgArgs = {
  //           userId: request?.userId,
  //           postId: savePost?._id,
  //           title: request?.fields.title,
  //           description: request?.fields.description,
  //           imgUrl: request?.fields.imgUrl,
  //         };
  //         const saveImagePost = await this.postStore.addImagePosts(imgArgs);
  //         break;
  //       } catch (error) {
  //         throw new Error("oops somthing went wrong while saving image");
  //       }

  //     case "video":
  //       try {
  //         const videoArgs = {
  //           userId: request.userId,
  //           postId: savePost._id,
  //           title: request.fields.title,
  //           description: request.fields.description,
  //           videoUrl: request.fields.videoUrl,
  //           videoType: request.fields.videoType,
  //         };
  //         const saveVideoPost = await this.postStore.addVideoPosts(videoArgs);
  //         break;
  //       } catch (error) {
  //         throw new Error("oops somthing went wrong while saving video");
  //       }
  //   }
  //   return {
  //     type: savePost.type,
  //     status: savePost.status,
  //     message: "successfully saved",
  //   };
  // }
  public addPosts = async (
    request: IPostServices.IAddPostRequest
  ): Promise<IPostServices.IAddPostResponse> => {
    const response: IPostServices.IAddPostResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
      message: "",
    };
    const user = await this.userStore.findOneData({ _id: request.userId });

    if (!user) {
      //console.error(e);
      const errorMsg = ErrorMessageEnum.Invalid_Credentials;
      response.status = STATUS_CODES.BAD_REQUEST;
      response.error = toError(errorMsg);
      return response;
      // throw new Error("Invalid Credentials user not found");
    }
    //switch case for type
    // store in db
    const postStatus = request.status;
    const postType = request.type;

    const postArgs = {
      userId: request.userId,
      type: postType,
      status: postStatus,
    };

    let savePost: IPOST;
    try {
      savePost = await this.postStore.addPosts(postArgs);
    } catch (e) {
      console.error(e);
      response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }

    switch (postType) {
      case "text":
        try {
          const textArgs = {
            userId: request.userId,
            postId: savePost._id,
            title: request.fields.title,
            description: request.fields.description,
          };
          
          const saveTextPost = await this.postStore.addTextPosts(textArgs);
          break;
        } catch (e) {
          //console.error(e);
          //throw new Error("oops somthing went wrong while saving text");
          const errorMsg = ErrorMessageEnum.TextSavingError;
          response.status = STATUS_CODES.BAD_REQUEST;
          response.error = toError(errorMsg);
          return response;
        }

      case "image":
        try {
          const imgArgs = {
            userId: request?.userId,
            postId: savePost?._id,
            title: request?.fields.title,
            description: request?.fields.description,
            imgUrl: request?.fields.imgUrl,
          };
          const saveImagePost = await this.postStore.addImagePosts(imgArgs);
          break;
        } catch (e) {
          // throw new Error("oops somthing went wrong while saving image");
          const errorMsg = ErrorMessageEnum.ImageSavingError;
          response.status = STATUS_CODES.BAD_REQUEST;
          response.error = toError(errorMsg);
          return response;
        }

      case "video":
        try {
          const videoArgs = {
            userId: request.userId,
            postId: savePost._id,
            title: request.fields.title,
            description: request.fields.description,
            videoUrl: request.fields.videoUrl,
            videoType: request.fields.videoType,
          };
          const saveVideoPost = await this.postStore.addVideoPosts(videoArgs);
          break;
        } catch (e) {
          //throw new Error("oops somthing went wrong while saving video");
          const errorMsg = ErrorMessageEnum.VideoSavingError;
          response.status = STATUS_CODES.BAD_REQUEST;
          response.error = toError(errorMsg);
          return response;
        }
    }
    response.status = STATUS_CODES.OK;
    response.post = savePost;
    response.message = "Success";
    return response;
    // return {
    //   type: savePost.type,
    //   status: savePost.status,
    //   message: "successfully saved",
    // };
  };

  //Update_Post
  // async updatePost(request: any) {
  public updatePost = async (
    request: IPostServices.IUpdatePostRequest
  ): Promise<IPostServices.IUpdatePostResponse> => {
    const response: IPostServices.IUpdatePostResponse = {
      status: STATUS_CODES.UNKNOWN_CODE,
      message: "",
    };

    const userfind = await this.userStore.findOneData({
      _id: request.userId,
    });
    const test = await this.postStore.findOneData({ id: request.id });
    if (userfind.roles != "admin") {
      if (userfind.roles == "editor") {
        if (test.userId != userfind._id) {
          console.log("Not Authroized Editor");
          //throw new Error("Not Authroized Editor");
        }
        throw new Error("not authroized ");
      }
      if (userfind.roles == "user") {
        if (test.userId != userfind._id) {
          console.log("Not Authroized user");
          throw new Error("Not Authroized user");
        }
        throw new Error("not authroized role");
      }
      throw new Error("not admin ");
    }
    if (!userfind) {
      //throw new Error("Invalid Credentials user not found");
      const errorMsg = ErrorMessageEnum.Invalid_Credentials;
      response.status = STATUS_CODES.BAD_REQUEST;
      response.error = toError(errorMsg);
      return response;
    }
    const postStatus = request.status;
    const postType = request.type;

    const postArgs = {
      type: postType,
      status: postStatus,
    };
    const data = await this.postStore.findOneDataAndUpdate(
      {
        _id: request.id,
        type: request.type,
        status: request.status,
      },
      { new: true }
    );

    switch (postType) {
      case "text":
        try {
          const textArgs = {
            title: request.fields.title,
            description: request.fields.description,
          };

          const user = await this.postStore.findtxtdbdata({
            postId: data._id,
          });
          const updateTextPost = await this.postStore.textPostUpd(
            user._id,
            textArgs
          );
          break;
        } catch (error) {
          //throw new Error("oops somthing went wrong while update text");
          const errorMsg = ErrorMessageEnum.TextUpdateError;
          response.status = STATUS_CODES.BAD_REQUEST;
          response.error = toError(errorMsg);
          return response;
        }

      case "image":
        try {
          const imgArgs = {
            title: request?.fields.title,
            description: request?.fields.description,
            imgUrl: request?.fields.imgUrl,
          };
          const user = await this.postStore.findimagedbdata({
            postId: data._id,
          });
          const updateTextPost = await this.postStore.imagePostUpd(
            user._id,
            imgArgs
          );
          break;
        } catch (error) {
          //throw new Error("oops somthing went wrong while update image");
          const errorMsg = ErrorMessageEnum.ImageUpdateError;
          response.status = STATUS_CODES.BAD_REQUEST;
          response.error = toError(errorMsg);
          return response;
        }

      case "video":
        try {
          const videoArgs = {
            title: request.fields.title,
            description: request.fields.description,
            videoUrl: request.fields.videoUrl,
            videoType: request.fields.videoType,
          };
          const user = await this.postStore.findvideodbdata({
            postId: data._id,
          });
          const updateTextPost = await this.postStore.videoPostUpd(
            user._id,
            videoArgs
          );
          break;
        } catch (error) {
          // new Error("oops somthing went wrong while Update video");
          const errorMsg = ErrorMessageEnum.VideoUpdateError;
          response.status = STATUS_CODES.BAD_REQUEST;
          response.error = toError(errorMsg);
          return response;
        }
    }
    response.status = STATUS_CODES.OK;
    response.post = data;
    response.message = "Success";
    return response;
    //   return {
    //     type: data.type,
    //     status: data.status,
    //     message: "Successfully Saved",
    //   };
    // } catch (e) {
    //   return e;
    // }
  };

  // async updatePost(request: any) {
  //   try {
  //     const userfind = await this.userStore.findOneData({
  //       _id: request.userId,
  //     });
  //     const test = await this.postStore.findOneData({ id: request.id });
  //     if (userfind.roles != "admin") {
  //       if (userfind.roles == "editor") {
  //         if (test.userId != userfind._id) {
  //           console.log("Not Authroized Editor");
  //           throw new Error("Not Authroized Editor");
  //         }
  //         throw new Error("not authroized ");
  //       }
  //       if (userfind.roles == "user") {
  //         if (test.userId != userfind._id) {
  //           console.log("Not Authroized user");
  //           throw new Error("Not Authroized user");
  //         }
  //         throw new Error("not authroized role");
  //       }
  //       throw new Error("not admin ");
  //     }
  //     if (!userfind) {
  //       throw new Error("Invalid Credentials user not found");
  //     }
  //     const postStatus = request.status;
  //     const postType = request.type;

  //     const postArgs = {
  //       type: postType,
  //       status: postStatus,
  //     };
  //     const data = await this.postStore.findOneDataAndUpdate(
  //       {
  //         _id: request.id,
  //         type: request.type,
  //         status: request.status,
  //       },
  //       { new: true }
  //     );

  //     switch (postType) {
  //       case "text":
  //         try {
  //           const textArgs = {
  //             title: request.fields.title,
  //             description: request.fields.description,
  //           };

  //           const user = await this.postStore.findtxtdbdata({
  //             postId: data._id,
  //           });
  //           const updateTextPost = await this.postStore.textPostUpd(
  //             user._id,
  //             textArgs
  //           );
  //           break;
  //         } catch (error) {
  //           throw new Error("oops somthing went wrong while saving text");
  //         }

  //       case "image":
  //         try {
  //           const imgArgs = {
  //             title: request?.fields.title,
  //             description: request?.fields.description,
  //             imgUrl: request?.fields.imgUrl,
  //           };
  //           const user = await this.postStore.findimagedbdata({
  //             postId: data._id,
  //           });
  //           const updateTextPost = await this.postStore.imagePostUpd(
  //             user._id,
  //             imgArgs
  //           );
  //           break;
  //         } catch (error) {
  //           throw new Error("oops somthing went wrong while saving image");
  //         }

  //       case "video":
  //         try {
  //           const videoArgs = {
  //             title: request.fields.title,
  //             description: request.fields.description,
  //             videoUrl: request.fields.videoUrl,
  //             videoType: request.fields.videoType,
  //           };
  //           const user = await this.postStore.findvideodbdata({
  //             postId: data._id,
  //           });
  //           const updateTextPost = await this.postStore.videoPostUpd(
  //             user._id,
  //             videoArgs
  //           );
  //           break;
  //         } catch (error) {
  //           throw new Error("oops somthing went wrong while saving video");
  //         }
  //     }
  //     return {
  //       type: data.type,
  //       status: data.status,
  //       message: "Successfully Saved",
  //     };
  //   } catch (e) {
  //     return e;
  //   }
  // }

  // async getTimeLine(request: any) {
  //   console.log(request, "service");
  //   const user = await this.postStore.find();
  //   console.log(user, "service");
  //   return user;
  // }
}
export default PostServices;
