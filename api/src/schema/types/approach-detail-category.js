import { GraphQLEnumType } from "graphql";

const ApproachDetailCategory = new GraphQLEnumType({
    name : 'ApproachDetailCategory',
    values : {
        NOTE : { value : 'notes'}, // mapping can be done in these brackets
        EXPLANATION : { value : 'explanations' },
        WARNING : { value : 'warnings'}
    }
})

export default ApproachDetailCategory;