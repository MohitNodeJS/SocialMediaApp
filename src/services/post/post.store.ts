import IPOST from "../../utils/interface/user/IPost";
import { model, Schema, Model } from "mongoose";
import postMongoose from "../../models/user.model/user_post";
import imagePost from "../../models/user.model/post_img";
import textPost from "../../models/user.model/post_text";
import videoPost from "../../models/user.model/post_video";
import ITEXTPOST from "../../utils/interface/user/ITextPost";
import IIMAGEPOST from "../../utils/interface/user/IImagePost";
import IVIDEOPOST from "../../utils/interface/user/IVideoPost";
export interface IPostModel extends IPOST {
  _id: string;
}
export interface ITextPostModel extends ITEXTPOST {
  _id: string;
}
export interface IImagePostModel extends IIMAGEPOST {
  _id: string;
}
export interface IVideoPostModel extends IVIDEOPOST {
  _id: string;
}

export const postSchema = new Schema(postMongoose);
export const PostDb: Model<IPostModel> = model<IPostModel>("post", postSchema);

export const textPostSchema = new Schema(textPost);
export const TextPostDb: Model<ITextPostModel> = model<ITextPostModel>(
  "textpost",
  textPostSchema
);

export const imagePostSchema = new Schema(imagePost);
export const ImagePostDb: Model<IImagePostModel> = model<IImagePostModel>(
  "imagepost",
  imagePostSchema
);

export const videoPostSchema = new Schema(videoPost);
export const VideoPostDb: Model<IVideoPostModel> = model<IVideoPostModel>(
  "videopost",
  videoPostSchema
);

export default class PostStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super("An error occured while processing the request.");
    }
  };
  /* createPost  */
  async addPosts(postInput: IPOST): Promise<IPOST> {
    const post = new PostDb(postInput);
    let savedPost: IPOST;
    try {
      savedPost = await post.save();
    } catch (e) {
      return e;
    }
    return savedPost;
  }

  //TextPost
  async addTextPosts(postTextInput: ITEXTPOST) {
    const postText = new TextPostDb(postTextInput);
    let savedPost: ITEXTPOST;
    try {
      savedPost = await postText.save();
    } catch (e) {
      return e;
    }
    return savedPost;
  }

  //ImagePost
  async addImagePosts(postImageInput: IIMAGEPOST) {
    const postImage = new ImagePostDb(postImageInput);
    let savedPost: IIMAGEPOST;
    try {
      savedPost = await postImage.save();
    } catch (e) {
      return e;
    }
    return savedPost;
  }

  //VideoPost
  async addVideoPosts(postVideoInput: IVIDEOPOST) {
    const postVideo = new VideoPostDb(postVideoInput);
    let savedPost: IVIDEOPOST;
    try {
      savedPost = await postVideo.save();
    } catch (e) {
      return e;
    }
    return savedPost;
  }


  public async findOneData(attributes: object) {
    try {
      let a = await PostDb.findOne(attributes).lean();
      return a;
    } catch (e) {
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async findbyID(attributes: object) {
    try {
      let a = await PostDb.findOne(attributes).lean();
      return a;
    } catch (e) {
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
  }


  public async findtxtdbdata(attributes: object) {
    try {
      let a = await TextPostDb.findOne(attributes).lean();
      return a;
    } catch (e) {
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async findimagedbdata(attributes: object) {
    try {
      let a = await ImagePostDb.findOne(attributes).lean();
      return a;
    } catch (e) {
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async findvideodbdata(attributes: object) {
    try {
      let a = await VideoPostDb.findOne(attributes).lean();
      return a;
    } catch (e) {
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async find() {
    return await PostDb.find().lean();
  }

  public async findOneDataAndUpdate(attributes: object, toUpdate: object) {
    try{
      const a=await PostDb.findByIdAndUpdate(attributes, toUpdate).lean();
      return a;
    }catch(e){
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async textPostUpd(_id: string, attributes: object) {
    try{
      let a = await TextPostDb.findByIdAndUpdate(
        { _id },
        { $set: attributes },
        { new: true }
      ).lean();
      return a;
    }catch(e){
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
    
  }
  public async imagePostUpd(_id: string, attributes: object) {
    try{
      let a = await ImagePostDb.findByIdAndUpdate(
        { _id },
        { $set: attributes },
        { new: true }
      ).lean();
      return a;
    }catch(e){
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
    
  }
  public async videoPostUpd(_id: string, attributes: object) {
    try{
      let a = await VideoPostDb.findByIdAndUpdate(
        { _id },
        { $set: attributes },
        { new: true }
      ).lean();
      return a;
    }catch(e){
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
    
  }


  public async getByAttributes(attributes: object): Promise<IPOST> {
    try {
      return await PostDb.findOne(attributes).lean();
    } catch (e) {
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async getTextPost(attributes: object): Promise<ITEXTPOST> {
    try {
      return await TextPostDb.findOne(attributes).lean();
    } catch (e) {
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async getImagePost(attributes: object): Promise<ITEXTPOST> {
    try {
      return await ImagePostDb.findOne(attributes).lean();
    } catch (e) {
      return Promise.reject(new PostStore.OPERATION_UNSUCCESSFUL());
    }
  }
}
