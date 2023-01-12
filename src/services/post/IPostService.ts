import { IResponse } from "src/utils/interface/common";
import ITEXTPOST from "src/utils/interface/user/ITextPost";
import IPOST from "../../utils/interface/user/IPost";

export interface IPostServiceAPI {
  // addPosts(request: IAddPost);
  addPosts(request: IAddPostRequest): Promise<IAddPostResponse>;
  updatePost(request: IUpdatePost);
  get(request: IGetPostRequest):Promise<IGetPostResponse>;
  // getTimeLine(request: IGetPost);
}
export interface IGetPostRequest {
  _id: string;
}
export interface IGetPostResponse extends IResponse {
  post?: IPOST;
  textpost?:ITEXTPOST;
  imagepost?:IImagePost;
}
// export interface IGetPost {
//   userId?: string;
// }
export interface ITextPost extends IImagePost {
  userId?: string;
  postId?: string;
  title: string;
  description: string;
}
export interface IImagePost extends IVideoPost {
  imgUrl: string;
}
export interface IVideoPost {
  videoType: string;
  videoUrl: string;
}
export interface IAddPost {
  _id?: string;
  userId?: string;
  type: string;
  status: string;
  fields: ITextPost;
}

/////////////////////////////////////////
//update post
////////////////////////////////////////
export interface IGetPost {
  userId?: string;
}
export interface ITextUpdatePost extends IImageUpdatePost {
  id?: string;
  userId?: string;
  postId?: string;
  title: string;
  description: string;
}
export interface IImageUpdatePost extends IVideoUpdatePost {
  imgUrl: string;
}
export interface IVideoUpdatePost {
  videoType: string;
  videoUrl: string;
}
export interface IUpdatePost {
  id?: string;
  userId?: string;
  type: string;
  status: string;
  fields: ITextUpdatePost;
}
////

export interface ITextPost extends IImagePost {
  userId?: string;
  postId?: string;
  title: string;
  description: string;
}
export interface IImagePost extends IVideoPost {
  imgUrl: string;
}
export interface IVideoPost {
  videoType: string;
  videoUrl: string;
}
export interface IAddPostRequest {
  _id?: string;
  userId?: string;
  type: string;
  status: string;
  fields: ITextPost;
}

export interface IAddPostResponse extends IResponse {
  type: string;
  message: string;
  post?: IPOST;
}

///update post response

export interface ITextUpdatePostRequest extends IImageUpdatePostRequest {
  id?: string;
  userId?: string;
  postId?: string;
  title: string;
  description: string;
}
export interface IImageUpdatePostRequest extends IVideoUpdatePostRequest {
  imgUrl: string;
}
export interface IVideoUpdatePostRequest {
  videoType: string;
  videoUrl: string;
}
export interface IUpdatePostRequest {
  id?: string;
  userId?: string;
  type: string;
  status: string;
  fields: ITextUpdatePostRequest;
}

export interface IUpdatePostResponse extends IResponse {
  message: string;
  post?: IPOST;
}
