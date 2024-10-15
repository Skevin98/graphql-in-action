// import { buildSchema } from "graphql";

// export const schema = buildSchema(`
//     type Query {
//     currentTime: String!
//     }
//     `);


// export const rootValue = {
//     currentTime: () => {
//         const isoString = new Date().toISOString();
//         return isoString.slice(11, 19);
//     }
// }

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    printSchema
} from 'graphql';
import NumbersInRange from './types/numbers-in-range';
import { numbersInRangeObject } from '../utils';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        currentTime: {
            type: GraphQLString,
            resolve: () => {
                return new Promise(
                    resolve=>{
                        setTimeout(()=>{
                            const isoString = new Date().toISOString();
                            resolve(isoString.slice(11, 19));
                        },
                        5000)
                    }
                );
                
                
            }
        },
        // sumNumberInRange: {
        //     type: new GraphQLNonNull(GraphQLInt),
        //     args: { // Fields arguments
        //         begin: { type: new GraphQLNonNull(GraphQLInt) },
        //         end: { type: new GraphQLNonNull(GraphQLInt) }
        //     },
        //     resolve: (source, { begin, end }) => {
        //         let result = 0;
        //         for (let index = begin; index <= end; index++) {
        //             result += index;

        //         }
        //         return result;
        //     }
        // },
        NumbersInRange: {
            type: NumbersInRange,
            args: { // Fields arguments
                begin: { type: new GraphQLNonNull(GraphQLInt) },
                end: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve : (source, {begin, end})=>{
                return numbersInRangeObject(begin, end);
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: QueryType,
});

console.log(printSchema(schema));
