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
    printSchema,
    GraphQLList
} from 'graphql';
import NumbersInRange from './types/numbers-in-range';
import { numbersInRangeObject } from '../utils';
import Task from './types/task';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        currentTime: {
            type: GraphQLString,
            resolve: () => { // Asynchronous functions
                return new Promise(
                    resolve => {
                        setTimeout(() => {
                            const isoString = new Date().toISOString();
                            resolve(isoString.slice(11, 19));
                        },
                            1000)
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
            resolve: (source, { begin, end }) => {
                return numbersInRangeObject(begin, end);
            }
        },
        taskMainList: {
            type: new GraphQLList(new GraphQLNonNull(Task)),
            resolve: async (source, args, { pgApi }) => {
                // const pgResp = await pgPool.query(`
                //     SELECT id, content, tags, user_id AS "userId", approach_count AS "approachCount", is_private AS "isPrivate", created_at AS "createdAt"
                //     FROM azdev.tasks
                //     WHERE is_private = FALSE
                //     ORDER BY created_at DESC
                //     LIMIT 100
                // `);
                // return pgResp.rows;
                return pgApi.taskMainList();
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: QueryType,
});

console.log(printSchema(schema));
