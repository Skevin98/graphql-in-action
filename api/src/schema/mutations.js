
import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import UserPayload from './types/payload-user';
import UserInput from './types/input-user';


export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        userCreate: {
            type: new GraphQLNonNull(UserPayload),
            args: {
                input: { type: new GraphQLNonNull(UserInput) }
            },
            resolve: async (Source, { input }, { mutators }) => {
                return mutators.userCreate({ input })
            }
        }

    })
});

export default MutationType;