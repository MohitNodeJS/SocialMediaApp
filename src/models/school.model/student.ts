import { nanoid } from "nanoid";
export default {
  _id: {
    type: String,
    default: () => nanoid(),
  },
  schoolId: {
    type: String,
    required: false,
  },
  studentName: {
    type: String,
    required: false,
  },
  rollNo:{
    type: Number,
    required: false,
  },
  class:{
    type: Number,
    required: false,
  },
  section:{
    type: String,
    required: false,
  },
  gender:{
    type: String,
    required: false,
  },
  studentDetails:{
    address:{
        type: String,
        required: false, 
    },
    contactNo:{
        type: String,
        required: false,
    },
    fatherName:{
        type: String,
        required: false, 
    },
    motherName:{
        type: String,
        required: false, 
    }
  }
};
