import IUSER from "../../utils/interface/user/IUser";
import { model, Schema, Model } from "mongoose";
import userMongoose from "../../models/user.model/user";
export interface IUserModel extends IUSER {
  _id: string;
}

export const userSchema = new Schema(userMongoose);
export const UserDb: Model<IUserModel> = model<IUserModel>("user", userSchema);

export default class UserStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super("An error occured while processing the request.");
    }
  };

  /**
   * creating new user and saving in Database
   */
  /* user register  */
  async userRegister(userInput: IUSER): Promise<IUSER> {
    const user = new UserDb(userInput);
    let savedUser: IUSER;
    try {
      savedUser = await user.save();
    } catch (e) {
      return e;
    }
    return savedUser;
  }

  public async findOneData(attributes: object) {
    try {
      const a = await UserDb.findOne(attributes).lean();
      return a;
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
  }
  public async findbyID(attributes: object) {
    try {
      const a = await UserDb.findOne(attributes).lean();
      return a;
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async findOneDataAndUpdate(attributes: object, toUpdate: object) {
    try {
      const a = await UserDb.findOneAndUpdate(attributes, toUpdate).lean();
      return a;
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
    
  }
}
