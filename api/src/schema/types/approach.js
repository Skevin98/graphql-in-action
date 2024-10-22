import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import User from "./user";
import Task from "./task";
import SearchResultItem from "./search-result-item";



const Approach = new GraphQLObjectType({
    name : 'Approach',
    interfaces : ()=> [SearchResultItem],
    fields : ()=> ({ // lambda function instead of a object
        id : {
            type : new GraphQLNonNull(GraphQLID)
        },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve : ({ createdAt })=>{
                return createdAt.toISOString();
            }
        },
        content: {
            type: new GraphQLNonNull(GraphQLString)
        },
        voteCount: {
            type : new GraphQLNonNull(GraphQLInt)
        },
        author: {
            type : new GraphQLNonNull(User),
            resolve : (source, args, { loaders })=>{
                // return pgApi.userInfo(source.userId);
                return loaders.users.load(source.userId);
            }
        },
        task: {
            type: new GraphQLNonNull(Task),
            resolve: (source, args, { loaders }) =>
            loaders.tasks.load(source.taskId)
            },
    })
});

export default Approach;