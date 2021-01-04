import * as express from 'express';
import UserService from '@exmpl/api/services/user';
import {writeJsonResponse} from '@exmpl/utils/express';

export function auth(req: express.Request, res: express.Response, 
  next: express.NextFunction): void {
    console.debug(`controller::user.ts::auth()`);
    const token = req.headers.authorization!;
    console.debug(`controller::user.ts::auth() .. token=[${token}]`);
      UserService.auth(token)
        .then(authResponse => {
          console.debug(`controller::user.ts::auth() .. authResponse=[${authResponse}]`);
          if(!(authResponse as any).error){
            res.locals.auth = {
              userId: (authResponse as {userId: string}).userId
            };
            next();
          }else{
            writeJsonResponse(res, 401, authResponse);
          }
        })
        .catch(err => {
          writeJsonResponse(res, 500, {
            error: {
              type: 'internal_server_error',
              message: 'Internal Server Error'
            }});
        });

}