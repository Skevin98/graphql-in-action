import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} from "graphql";



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
        }
    }
}
)

export default Task;