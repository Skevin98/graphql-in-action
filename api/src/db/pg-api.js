import pgClient from "./pg-client";
import sqls from "./sqls";

const pgApiWrapper = async () => {
    const { pgPool } = await pgClient();
    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params));

    return {
        taskMainList: async () => {
            const pgResp = await pgQuery(sqls.tasksLatest);
            return pgResp.rows;
        },
        // userInfo : async (userId) =>{
        //     const pgResp = await pgQuery(sqls.usersFromIds, {$1 : [userId]});
        //     return pgResp.rows[0];
        // },
        usersInfo: async (userIds) => {
            const pgResp = await pgQuery(sqls.usersFromIds, { $1: userIds });
            return userIds.map(
                (userId) =>
                    pgResp.rows.find(
                        (row) => userId === row.id
                    )
            )
        },
        // approachList: async (taskId) => {
        //     const pgResp = await pgQuery(sqls.approachesForTaskIds, { $1: [taskId] });
        //     return pgResp.rows;
        // }
        approachLists: async (taskIds) => {
            const pgResp = await pgQuery(sqls.approachesForTaskIds,
                {
                    $1: taskIds,
                }
            );
            return taskIds.map((taskId) =>
                pgResp.rows.filter((row) => taskId == row.taskId)
            )
        },
        tasksInfo: async (taskIds) => {
            const pgResp = await pgQuery(sqls.tasksFromIds, { $1: taskIds, $2: null });
            return taskIds.map(
                (taskId) =>
                    pgResp.rows.find((row) => taskId == row.id)
            )
        },
        tasksByTypes: async (types) => {
            const results = types.map(async (type) => {
                if (type === 'latest') {
                    const pgResp = await pgQuery(sqls.tasksLatest);
                    return pgResp.rows;
                }
                throw Error('Unsupported type');
            });
            return Promise.all(results);
        },
        searchResults: async (searchTerms) => {
            const results = searchTerms.map(async (searchTerm) => {
                const pgResp = await pgQuery(sqls.searchResults, {
                    $1: searchTerm,
                    $2: null, // pass logged-in userId here.
                });
                return pgResp.rows;
            });
            return Promise.all(results);
        },
    }
}

export default pgApiWrapper;