import * as express from 'express';
//import { writeJsonResponse } from '../../utils/express';
import { writeJsonResponse } from '@exmpl/utils/express';

export function hello(req: express.Request, res: express.Response): void{
  console.debug(`controller::greeting.ts::hello()`);
  const name = req.query.name || 'stranger';
  writeJsonResponse(res, 200, {"message": `Hello, ${name}!`});
}

export function goodbye(req: express.Request, res: express.Response): void {
  console.debug(`controller::greeting.ts::goodbye()`);
  console.debug(`controller::greeting.ts::goodbye() .. res.locals=[${JSON.stringify(res.locals)}]`);
  console.debug(`controller::greeting.ts::goodbye() .. res.locals.auth=[${res.locals.auth}]`);
  const userId = res.locals.auth.userId;
  writeJsonResponse(res, 200, {"message": `GoodBye, ${userId}!`});
}
