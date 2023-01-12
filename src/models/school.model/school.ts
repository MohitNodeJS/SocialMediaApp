import { nanoid } from "nanoid";
import {schoolRoles} from "../../utils/role/schoolRole"
export default {
  _id: {
    type: String,
    default: () => nanoid(),
  },
  schoolName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    enum: Object.values(schoolRoles),
    require:true
  },
  address: {
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
  },
};
