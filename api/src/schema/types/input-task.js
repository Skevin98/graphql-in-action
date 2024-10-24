import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";

const TaskInput = new GraphQLInputObjectType({
    name: 'Taskinput',
    fields: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        tags: {
            type: new GraphQLNonNull(
                new GraphQLList(
                    new GraphQLNonNull(GraphQLString)
                )
            )
        },
        isPrivate : { type : new GraphQLNonNull(GraphQLBoolean) }
    }
}
)

export const UpdateTaskInput = new GraphQLInputObjectType({
    name: 'UpdateTaskinput',
    fields: {
        id : { type : new GraphQLNonNull(GraphQLID)},
        content: { type: new GraphQLNonNull(GraphQLString) },
        tags: {
            type: new GraphQLNonNull(
                new GraphQLList(
                    new GraphQLNonNull(GraphQLString)
                )
            )
        },
        isPrivate : { type : new GraphQLNonNull(GraphQLBoolean) }
    }
}
)

export default TaskInput;