import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} from "graphql";
import User from "./user";
import Approach from "./approach";



const Task = new GraphQLObjectType({
    name: 'Task',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve : (source)=>{
                return source.createdAt.toISOString();
            }
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        },
        tags: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
            resolve : (source)=>{
                return source.tags.split(',');
            }
        },
        approachCount: {
            type : new GraphQLNonNull(GraphQLInt)
        },
        author: {
            type : new GraphQLNonNull(User),
            resolve : (source, args, { loaders })=>{
                return loaders.users.load(source.userId);
            }
            // resolve : prefixedObject => extractPrefixedColumns({prefixedObject, prefix : 'author'}),
        },
        approachList: {
            type : new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Approach))),
            resolve : (source,args,{ loaders })=>{
                // return pgApi.approachList(source.id);
                return loaders.approachLists.load(source.id)
            }
        }
    }
}
)

export default Task;