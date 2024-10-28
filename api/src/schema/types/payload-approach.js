import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql"
import UserError from "./user-error"
import Approach from "./approach"

const ApproachPayload = new GraphQLObjectType({
    name : 'ApproachPayload',
    fields : ()=>({
        errors : {
            type : new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError)))
        },
        approach : {type : Approach}
    })
})

export default ApproachPayload;