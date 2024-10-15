import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType } from "graphql";

const NumbersInRange = new GraphQLObjectType({
    name: 'NumbersInRange',
    description: 'Aggregate info on a range of numbers',
    fields: {
        sum: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        count: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        avg: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    }
});

 export default NumbersInRange;