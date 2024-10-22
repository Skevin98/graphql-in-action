import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import User from "./user";



const Approach = new GraphQLObjectType({
    name : 'Approach',
    fields : {
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
        // Task : {
        //     type : new GraphQLNonNull(Task)
        // },
        // detailList : {
        //     type : new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ApproachDetail)
        //     ))
        // }
    }
});

export default Approach;