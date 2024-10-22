import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

const User = new GraphQLObjectType(
    {
        name: 'User',
        fields: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            username: {
                type: GraphQLString,
            },
            name: {
                type: new GraphQLNonNull(GraphQLString),
                resolve: ({firstName, lastName}) => {
                    return [firstName, lastName].filter(Boolean).join(' ')
                }
            },
            // taskList: {
            //     type: new GraphQLNonNull(
            //         new GraphQLList(
            //             new GraphQLNonNull(Task)
            //         )
            //     ),
            //     resolve: (source) => { }
            // },

        }
    }
);

export default User;