import { nanoid } from "nanoid";
export default  {
  _id: {
        type: String,
        default: () => nanoid(),
      },
      userId: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        enum : ['text','image','video']
      },
      status: {
        type: String,
        enum : ['public','private','deleted'],
        default:'public',
      },
      createdAt: {type: Number, default: Date.now()}
}