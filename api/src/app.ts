import {createServer} from './utils/server';

console.debug(`app.ts::init()`);
createServer()
  .then( server => {
      server.listen( 3021, () => {
          console.info(`Listening on port: ${3021}`);
      })
  })
  .catch( err => {
      console.error(`Error:: ${err}`);
  });
