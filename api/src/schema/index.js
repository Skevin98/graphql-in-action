import { GraphQLSchema, printSchema } from "graphql";
import QueryType from "./queries";
import MutationType from "./mutations";





export const schema = new GraphQLSchema({
    query: QueryType,
    mutation : MutationType // mutation schema
});

console.log(printSchema(schema));
