/** GIA NOTES
 *
 * Use the code below to start a bare-bone express web server
 **/
import { schema, rootValue } from "./schema";
import { graphqlHTTP } from "express-graphql";

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import * as config from './config';

async function main() {
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

  server.use('/', 
    graphqlHTTP({
      schema,
      rootValue,
      graphiql : true
    })
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