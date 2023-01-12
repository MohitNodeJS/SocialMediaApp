import { ApolloError } from "apollo-server-express";
import STATUS_CODES from "../../utils/enum/StatusCodesEnum";
import proxy from "../../services/app_service_proxy";
import * as IPostServices from "../../services/post/IPostService";
import AuthMiddleware from "../../utils/middleware/auth_middleware";

export default {
  Query: {
    // async getTimeLine(parent, args, context) {
    //   await AuthMiddleware.Validattion(context);
    //   const userId = context.user._id;
    //   let request: IPostServices.IGetPost = { userId };
    //   try {
    //     let displayData = await proxy.post.getTimeLine(request);
    //     return displayData;
    //   } catch (e) {
    //     throw e;
    //   }
    // },
  },
  Mutation: {
    //Addpost
    async addPosts(parent, args, context) {
      await AuthMiddleware.Validattion(context);
      const userId = context.user._id;

      const {
        userPost: {
          fields: { description, imgUrl, title, videoType, videoUrl },
          status,
          type,
        },
      } = args;

      let request: IPostServices.IAddPostRequest = {
        fields: {
          description,
          title,
          imgUrl,
          videoType,
          videoUrl,
        },
        status,
        type,
        userId,
      };

      let response: IPostServices.IAddPostResponse;

      try {
        response = await proxy.post.addPosts(request);
        if (response.status !== STATUS_CODES.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }
      return response;
    },

    //update post
    // async updatePost(parent, args, context) {
    //   await AuthMiddleware.Validattion(context);
    //   const userId = context.user._id;
    //   const {
    //     userPost: {
    //       fields: { description, imgUrl, title, videoType, videoUrl },
    //       status,
    //       type,
    //       id,
    //     },
    //   } = args;

    //   let request: IPostServices.IUpdatePost = {
    //     fields: {
    //       description,
    //       title,
    //       imgUrl,
    //       videoType,
    //       videoUrl,
    //     },
    //     status,
    //     type,
    //     userId,
    //     id,
    //   };

    //   let myresponse;
    //   try {
    //     myresponse = await proxy.post.updatePost(request);
    //   } catch (e) {
    //     throw new Error("error");
    //   }
    //   return myresponse;
    // },
    async updatePost(parent, args, context) {
      await AuthMiddleware.Validattion(context);
      const userId = context.user._id;
      const {
        userPost: {
          fields: { description, imgUrl, title, videoType, videoUrl },
          status,
          type,
          id,
        },
      } = args;

      let request: IPostServices.IUpdatePostRequest = {
        fields: {
          description,
          title,
          imgUrl,
          videoType,
          videoUrl,
        },
        status,
        type,
        userId,
        id,
      };

      let response: IPostServices.IUpdatePostResponse;
      try {
        response = await proxy.post.updatePost(request);
      } catch (e) {
        throw e;
      }
      return response;
    },
  },
};
