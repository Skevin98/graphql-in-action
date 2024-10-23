import { GraphQLString,GraphQLObjectType, GraphQLNonNull } from 'graphql';


const UserError = new GraphQLObjectType({
    name : 'UserError',
    fields : ()=>({
        message : {type : new GraphQLNonNull(GraphQLString)}
    })
})

export default UserError;