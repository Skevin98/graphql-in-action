import pgClient from "./pg-client";
import sqls from "./sqls";
import { randomString } from '../utils';

const pgApiWrapper = async () => {
    const { pgPool } = await pgClient();
    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params));

    return {
        tasksForUsers: async (userIds) => {
            const pgResp = await pgQuery(sqls.tasksForUsers, { $1: userIds });
            return userIds.map((userId) =>
                pgResp.rows.filter((row) => userId === row.userId),
            );

        },
        userFromAuthToken: async (authToken) => {
            if (authToken == null) {
                return null;
            }
            const pgResp = await pgQuery(sqls.userFromAuthToken, { $1: authToken });
            return pgResp.rows[0];
        },

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
        tasksInfo: async ({ taskIds, currentUser }) => {
            const pgResp = await pgQuery(sqls.tasksFromIds,
                {
                    $1: taskIds,
                    $2: currentUser
                        ? currentUser.id
                        : null
                });
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
        searchResults: async ({ searchTerms, currentUser }) => {
            const results = searchTerms.map(async (searchTerm) => {
                const pgResp = await pgQuery(sqls.searchResults, {
                    $1: searchTerm,
                    $2: currentUser
                        ? currentUser.id
                        : null,
                });
                return pgResp.rows;
            });
            return Promise.all(results);
        },
        mutators: {
            userCreate: async ({ input }) => {
                const payload = { errors: [] };
                if (input.password.length < 6) {
                    payload.errors.push({
                        message: 'Use a stronger password',
                    });
                }
                if (input.firstName.search(/\d/) != -1) {
                    payload.errors.push({
                        message: 'firstName should not contain numbers',
                    });
                }

                if (input.lastName.search(/\d/) != -1) {
                    payload.errors.push({
                        message: 'lastName should not contain numbers',
                    });
                }
                if (payload.errors.length === 0) {
                    const authToken = randomString();
                    try {
                        const pgResp = await pgQuery(sqls.userInsert, {
                            $1: input.username.toLowerCase(),
                            $2: input.password,
                            $3: input.firstName,
                            $4: input.lastName,
                            $5: authToken,
                        });

                        if (pgResp.rows[0]) {
                            payload.user = pgResp.rows[0];
                            payload.authToken = authToken;
                        }
                    } catch (error) {
                        payload.errors.push({
                            message: error.message
                        })
                    }



                }
                return payload;
            },
            userLogin: async ({ input }) => {
                const payload = { errors: [] };
                if (!input.username || !input.password) {
                    payload.errors.push({
                        message: 'Invalid username or password',
                    });
                }
                if (payload.errors.length === 0) {
                    const pgResp = await pgQuery(sqls.userFromCredentials, {
                        $1: input.username.toLowerCase(),
                        $2: input.password,
                    });
                    const user = pgResp.rows[0];
                    if (user) {
                        const authToken = randomString();
                        await pgQuery(sqls.userUpdateAuthToken, {
                            $1: user.id,
                            $2: authToken,
                        });
                        payload.user = user;
                        payload.authToken = authToken;
                    } else {
                        payload.errors.push({
                            message: 'Invalid username or password'
                        });
                    }
                }
                return payload;
            },
        }
    }
}

export default pgApiWrapper;