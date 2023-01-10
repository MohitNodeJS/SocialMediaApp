import UserServices from './user/user.service';
import PostServices from './post/post.service';

import * as IUserService from './user/IUserServices'
import * as IPostService from './post/IPostService'
export interface IAppServiceProxy {
    user: IUserService.IUserServiceAPI;
    post:IPostService.IPostServiceAPI
  }
class AppServicesProxy implements IAppServiceProxy {
    public user: IUserService.IUserServiceAPI;
    public post: IPostService.IPostServiceAPI;
    constructor(){
        this.user= new UserServices(this),
        this.post=new PostServices(this)
    }
}
export default new AppServicesProxy()