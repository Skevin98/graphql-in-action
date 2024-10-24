
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import UserPayload from './types/payload-user';
import UserInput from './types/input-user';
import AuthInput from './types/input-auth';
import TaskPayload from './types/payload-task';
import TaskInput, { UpdateTaskInput } from './types/input-task';


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
        },
        userLogin: {
            type: new GraphQLNonNull(UserPayload),
            args: {
                input: { type: new GraphQLNonNull(AuthInput) },
            },
            resolve: async (source, { input }, { mutators }) => {
                return mutators.userLogin({ input });
            },
        },
        taskCreate: {
            type: TaskPayload,
            args: {
                input: { type: new GraphQLNonNull(TaskInput) },
            },
            resolve: async (
                source, { input }, { mutators, currentUser }
            ) => {
                return mutators.taskCreate({ input, currentUser })
            }
        },
        taskUpdate : {
            type: TaskPayload,
            args: {
                id : {type : new GraphQLNonNull(GraphQLID)},
                input: { type: new GraphQLNonNull(UpdateTaskInput) },
            },
            resolve: async (
                source, { id, input }, { mutators, currentUser }
            ) => {
                return mutators.taskUpdate({ id, input, currentUser })
            }
        }

    })
});

export default MutationType;