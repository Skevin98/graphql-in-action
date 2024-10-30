
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import UserPayload from './types/payload-user';
import UserInput from './types/input-user';
import AuthInput from './types/input-auth';
import TaskPayload from './types/payload-task';
import TaskInput, { UpdateTaskInput } from './types/input-task';
import ApproachPayload from './types/payload-approach';
import ApproachInput from './types/input-approach';
import ApproachVoteInput from './types/input-approach-vote';
import UserDeletePayload from './types/payload-user-delete';
import TaskDeletePayload from './types/paylaod-task-delete';


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
        },
        approachCreate : {
            type : ApproachPayload,
            args : {
                taskId : { type : new GraphQLNonNull(GraphQLID),},
                input : { type : new GraphQLNonNull(ApproachInput)}
            },
            resolve : async (
                source, { taskId, input }, { mutators, currentUser }
            ) => {
                return mutators.approachCreate({ taskId, input, currentUser, mutators })
            } 
        },

        approachVote:{
            type : ApproachPayload,
            args : {
                approachId : { type : new GraphQLNonNull(GraphQLID),},
                input : { type : new GraphQLNonNull(ApproachVoteInput),},
            },
            resolve : async (source, {approachId, input},{mutators})=>{
                return mutators.approachVote({approachId, input})
            }
        },
        userdelete : {
            type : new GraphQLNonNull(UserDeletePayload),
            resolve : async (source, args, { mutators, currentUser })=>
                mutators.userDelete({currentUser})
        },
        taskDelete : {
            type : new GraphQLNonNull(TaskDeletePayload),
            args : {
                taskId : {type : new GraphQLNonNull(GraphQLID)}
            },
            resolve : async (source,{taskId},{mutators, currentUser}) => 
                mutators.taskDelete({taskId,currentUser})
        }

    })
});

export default MutationType;