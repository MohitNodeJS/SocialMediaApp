export interface IPostServiceAPI {
    addPosts(request: IAddPost);
    updatePost(request: IUpdatePost);
    getTimeLine(request: IGetPost);
}

// export interface ITextPost extends IImagePost{
//     _id?:string;
//     post_Id?:string;
//     user_Id?:string;
//     title:string;
//     description:string
// }
// export interface IImagePost extends IVideoPost{
//     imgUrl?:string
// }
// interface IVideo {
//     videoType?: string;
//     videoUrl?: string
// }
// export interface IVideoPost {
//     postId?:string
//     video?:IVideo
// }
export interface IGetPost {
    userId?:string;
}
export interface ITextPost extends IImagePost {
    userId?:string;
    postId?:string;
    title:string;
    description:string;
}
export interface IImagePost extends IVideoPost {
    imgUrl:string;
}
export interface IVideoPost{
    
    videoType:string;
    videoUrl:string;
}
export interface IAddPost{
    _id?:string;
    userId?:string;
    type:string;
    status:string;
    fields:ITextPost
}

/////////////////////
//update post
////////////
export interface IGetPost {
    userId?:string;
}
export interface ITextUpdatePost extends IImageUpdatePost {
    id?:string;
    userId?:string;
    postId?:string;
    title:string;
    description:string;
}
export interface IImageUpdatePost extends IVideoUpdatePost {
    imgUrl:string;
}
export interface IVideoUpdatePost{
    videoType:string;
    videoUrl:string;
}
export interface IUpdatePost{
    id?:string;
    userId?:string;
    type:string;
    status:string;
    fields:ITextUpdatePost
}