import IPOST from "../../utils/interface/IPost";
import { model, Schema, Model } from "mongoose";
import postMongoose from "../../models/user_post";
import imagePost from "../../models/post_img";
import textPost from "../../models/post_text";
import videoPost from "../../models/post_video";
import ITEXTPOST from "../../utils/interface/ITextPost";
import IIMAGEPOST from "../../utils/interface/IImagePost";
import IVIDEOPOST from "../../utils/interface/IVideoPost";
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
  /* createPost  */
  async addPosts(postInput: IPOST) {
    const post = new PostDb(postInput);
    let savedPost: IPOST;
    savedPost = await post.save();
    return savedPost;
  }

  //TextPost
  async addTextPosts(postTextInput: ITEXTPOST) {
    const postText = new TextPostDb(postTextInput);
    let savedPost: ITEXTPOST;
    savedPost = await postText.save();
    return savedPost;
  }

  //ImagePost
  async addImagePosts(postImageInput: IIMAGEPOST) {
    const postImage = new ImagePostDb(postImageInput);
    let savedPost: IIMAGEPOST;
    savedPost = await postImage.save();
    return savedPost;
  }

  //VideoPost
  async addVideoPosts(postVideoInput: IVIDEOPOST) {
    const postVideo = new VideoPostDb(postVideoInput);
    let savedPost: IVIDEOPOST;
    savedPost = await postVideo.save();
    return savedPost;
  }

  public async findOneData(attributes: object) {
    return await PostDb.findOne(attributes).lean();
  }
  public async findtxtdbdata(attributes: object) {
    return await TextPostDb.findOne(attributes).lean();
  }
  public async findimagedbdata(attributes: object) {
    return await ImagePostDb.findOne(attributes).lean();
  }
  public async findvideodbdata(attributes: object) {
    return await VideoPostDb.findOne(attributes).lean();
  }

  public async find() {
    return await PostDb.find().lean();
  }

  public async findOneDataAndUpdate(attributes: object, toUpdate: object) {
    return await PostDb.findByIdAndUpdate(attributes, toUpdate).lean();
  }

  public async textPostUpd(_id: string, attributes: object) {
    let a = await TextPostDb.findByIdAndUpdate(
      { _id },
      { $set: attributes },
      { new: true }
    ).lean();
    return a;
  }
  public async imagePostUpd(_id: string, attributes: object) {
    let a = await ImagePostDb.findByIdAndUpdate(
      { _id },
      { $set: attributes },
      { new: true }
    ).lean();
    return a;
  }
  public async videoPostUpd(_id: string, attributes: object) {
    let a = await VideoPostDb.findByIdAndUpdate(
      { _id },
      { $set: attributes },
      { new: true }
    ).lean();
    return a;
  }
}
