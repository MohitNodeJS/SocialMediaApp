// import { makeExecutableSchema } from "@graphql-tools/schema";
// import userResolvers from "../graphql/resolvers/user_resolver";
// import postResolvers from "../graphql/resolvers/user_posts_resolver"
// import fileResolvers from "./resolvers/file_upload_resolver";
// import schema from "./schema";
// import { merge } from "lodash";

// export const userresolvers = merge(userResolvers);
// export const postresolvers=merge(postResolvers);
// export const fileresolver=merge(fileResolvers);
// export const userSchema=merge(schema);

// export const executableSchema = makeExecutableSchema({
//   resolvers: { ...userresolvers,...postresolvers,...fileResolvers },
//   typeDefs:{...userSchema},
// });
// // 