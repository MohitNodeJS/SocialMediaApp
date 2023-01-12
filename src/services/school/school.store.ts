import ISCHOOL from "../../utils/interface/school/ISchool";
import { model, Schema, Model } from "mongoose";
import schoolMongoose from "../../models/school.model/school";

export interface ISchoolModel extends ISCHOOL {
  _id: string;
}

export const schoolSchema = new Schema(schoolMongoose);
export const SchoolDB: Model<ISchoolModel> = model<ISchoolModel>("school", schoolSchema);
console.log(SchoolDB,"store");


export default class UserStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super("An error occured while processing the request.");
    }
  };

  async schoolRegistor(userInput: ISCHOOL): Promise<ISCHOOL> {
    const school = new SchoolDB(userInput);
    let savedUser: ISCHOOL;
    try {
      savedUser = await school.save();
    } catch (e) {
      return e;
    }
    return savedUser;
  }


  public async findOneData(attributes: object) {
    try {
      const a = await SchoolDB.findOne(attributes).lean();
      return a;
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
  }

}
