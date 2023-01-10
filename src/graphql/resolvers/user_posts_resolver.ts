import proxy from "../../services/app_service_proxy";
import * as IPostServices from "../../services/post/IPostService";
import AuthMiddleware from "../../utils/middleware/auth_middleware";
//  const userPostResolvers = {

export default {
  Query: {
    //hello: () => 'world'
    async getTimeLine(parent, args, context) {
      await AuthMiddleware.Validattion(context);
      const userId = context.user._id;

      let request: IPostServices.IGetPost = { userId };
      try {
        let displayData = await proxy.post.getTimeLine(request);
        return displayData;
      } catch (e) {
        throw e;
      }
    },
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

      let request: IPostServices.IAddPost = {
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

      let myresponse;
      try {
        myresponse = await proxy.post.addPosts(request);
      } catch (e) {
        throw new Error("error");
      }
      return myresponse;
    },


    //update post
    async updatePost(parent, args, context){
      await AuthMiddleware.Validattion(context);
      const userId = context.user._id;
      const {
        userPost: {
          fields: { description, imgUrl, title, videoType, videoUrl },
          status,
          type,
          id
        },
      } = args;

      let request: IPostServices.IUpdatePost = {
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
        id
      };

      let myresponse;
      try {
        myresponse = await proxy.post.updatePost(request);
      } catch (e) {
        throw new Error("error");
      }
      return myresponse;
    }
  }
}
