import UserServices from "./user/user.service";
import PostServices from "./post/post.service";

import * as IUserService from "./user/IUserServices";
import * as IPostService from "./post/IPostService";
import * as ISchoolService from "./school/ISchoolServices";
import SchoolService from "./school/school.service";
export interface IAppServiceProxy {
  user: IUserService.IUserServiceAPI;
  post: IPostService.IPostServiceAPI;
  school:ISchoolService.ISchoolServiceAPI;
}
class AppServicesProxy implements IAppServiceProxy {
  public user: IUserService.IUserServiceAPI;
  public post: IPostService.IPostServiceAPI;
  public school: ISchoolService.ISchoolServiceAPI;
  constructor() {
    (this.user = new UserServices(this)), 
    (this.post = new PostServices(this)),
    (this.school = new SchoolService(this));
  }
}
export default new AppServicesProxy();
