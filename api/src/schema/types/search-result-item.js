import { GraphQLID, GraphQLInterfaceType, GraphQLNonNull, GraphQLString } from "graphql";
import Task from "./task";
import Approach from "./approach";

const SearchResultItem = new GraphQLInterfaceType({
    name: 'SearchResultitem',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) }
    }),
    resolveType(object) {
        if (object.type == 'task') {
            return Task;
        }
        if (object.type == 'approach') {
            return Approach;
        }
    }
})

export default SearchResultItem;