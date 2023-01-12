import { mergeResolvers } from "@graphql-tools/merge";
import userPostResolvers from "./user/userPosts.resolver";
import fileResolvers from "./user/file_upload_resolver";
import userResolvers from "./user/user.resolver";
import schoolResolver from "./school/school.resolver";
const resolvers = mergeResolvers([
  userResolvers,
  userPostResolvers,
  fileResolvers,
  schoolResolver,
]);

export default resolvers;
