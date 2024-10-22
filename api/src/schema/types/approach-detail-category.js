import { GraphQLEnumType } from "graphql";

const ApproachDetailCategory = new GraphQLEnumType({
    name : 'ApproachDetailCategory',
    values : {
        NOTE : {}, // mapping can be done in these brackets
        EXPLANATION : {},
        WARNING : {}
    }
})

export default ApproachDetailCategory;