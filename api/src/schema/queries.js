import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
} from 'graphql';
import NumbersInRange from './types/numbers-in-range';
import { numbersInRangeObject } from '../utils';
import Task from './types/task';
import SearchResultItem from './types/search-result-item';
import { Me } from './types/user';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields:()=> ({
        me: {
            type: Me,
            resolve:  async (source, args, { currentUser }) => {
                
                return currentUser;
            }
        },
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
            resolve: async (source, args, { loaders }) => {

                //return pgApi.taskMainList();
                return loaders.tasksByTypes.load('latest');
            }
        },

        taskInfo: {
            type: new GraphQLNonNull(Task),
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve: async (source, { id }, { loaders }) => {

                return loaders.tasks.load(id);
            }
        },

        search: {
            type: new GraphQLNonNull(
                new GraphQLList(
                    new GraphQLNonNull(SearchResultItem)
                )
            ),
            args: {
                term: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (source, args, { loaders }) => {
                return loaders.searchResults.load(args.term);
            }
        }
    })
});

export default QueryType;