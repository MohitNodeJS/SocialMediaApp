import { mergeResolvers } from "@graphql-tools/merge";
import userPostResolvers from './user_posts_resolver';
import fileResolvers from './file_upload_resolver'
import userResolvers from "./user_resolver";
const resolvers = mergeResolvers ([
    userResolvers,
    userPostResolvers,
    fileResolvers,
])

export default resolvers