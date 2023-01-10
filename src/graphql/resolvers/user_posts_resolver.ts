// import PostServices from "../../services/post/post.service";
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
      console.log("iiddd", userId);

      const {
        userPost: {
          fields: { description, imgUrl, title, videoType, videoUrl },
          status,
          type,
        },
      } = args;
      console.log(args, "resolver");

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
      console.log(request, "request resolver");

      let myresponse;
      try {
        myresponse = await proxy.post.addPosts(request);
        console.log(myresponse, "resolver respnse");
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
      console.log(args, "resolver");

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
      console.log(request, "request resolver");

      let myresponse;
      try {
        myresponse = await proxy.post.updatePost(request);
        console.log(myresponse, "resolver respnse");
      } catch (e) {
        throw new Error("error");
      }
      return myresponse;
    


    //   await AuthMiddleware.Validattion(context);
    //   const userId = context.user._id;
    //   console.log( context.user,"token resolver");
    //   const {
    //     fields: { description, imgUrl, title, videoType, videoUrl },
    //       status,
    //       type,
    //       id
          
    //   } = args;
    //   console.log(args,"resolver");
      

    //   let request: IPostServices.IUpdatePost = {
    //     fields: { description, imgUrl, title, videoType, videoUrl },
    //     id,
    //     status,
    //     type,
    //     userId
    //   };
    //   console.log(request,"reolver request");
      

    //   //let response:IUserServices.IResetPasswordResponse;

    //   try {
    //      const response = await proxy.post.updatePost(request);
    //      console.log(response,"resolver response");
         
    //     return response;
    //   } catch (e) {
    //     throw e;
    //   }
    // },
    }
  }
}
