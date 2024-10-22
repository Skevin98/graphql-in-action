/* eslint-disable no-unused-vars */
/** GIA NOTES
 *
 * Use the code below to start a bare-bone express web server
 **/
import { schema } from "./schema";
import { graphqlHTTP } from "express-graphql";

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import * as config from './config';
// import pgClient from "./db/pg-client";
import pgApiWrapper from "./db/pg-api";
import DataLoader from "dataloader";


async function main() {
  // const { pgPool } = await pgClient(); // pgPool recuperation
  const pgApi = await pgApiWrapper();
  const server = express();
  server.use(cors());
  server.use(morgan('dev'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use('/:fav.ico', (req, res) => res.sendStatus(204));

  // // Example route
  // server.use('/', (req, res) => {
  //   res.send('Hello World');
  // });

  // // This line rus the server
  // server.listen(config.port, () => {
  //   console.log(`Server URL: http://localhost:${config.port}/`);
  // });

  // server.use('/',
  //   graphqlHTTP({
  //     schema,
  //     // rootValue, // plus besoin
  //     // context : { pgPool }, // context for the query
  //     context: { pgApi },  // wrapper
  //     graphiql: true,
  //     customFormatErrorFn: (err) => {
  //       const errorReport = {
  //         message: err.message,
  //         locations: err.locations,
  //         stack: err.stack ? err.stack.split('\n') : [],
  //         path: err.path
  //       };
  //       console.error('GraphQL Error', errorReport);
  //       return config.isDev
  //         ? errorReport
  //         : { message: 'Oops! something went wrong! : (' }
  //     }
  //   })
  // );

  server.use('/',
    (req, res) => {
      const loaders = {
        users: new DataLoader((userIds) => pgApi.usersInfo(userIds)),
        approachLists: new DataLoader((taskIds) =>
          pgApi.approachLists(taskIds),
        )
      };
      graphqlHTTP({
        schema,
        context: { pgApi, loaders },  // wrapper and loader
        graphiql: true,
        customFormatErrorFn: (err) => {
          const errorReport = {
            message: err.message,
            locations: err.locations,
            stack: err.stack ? err.stack.split('\n') : [],
            path: err.path
          };
          console.error('GraphQL Error', errorReport);
          return config.isDev
            ? errorReport
            : { message: 'Oops! something went wrong! : (' }
        }
      })(req, res);
    }
  );

  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/`);
  });
}

main();


// import { graphql } from 'graphql';
// import { rootValue, schema } from './schema';

// const executeGraphQLRequest = async request=> {
//   const resp = await graphql({schema, source : request, rootValue});
//   console.log(resp.data);
// };

// executeGraphQLRequest(process.argv[2]);