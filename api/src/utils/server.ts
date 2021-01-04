import express from 'express';
import { Express } from 'express-serve-static-core'
import * as OpenApiValidator  from 'express-openapi-validator';
import { connector, summarise} from 'swagger-routes-express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

import * as api from '@exmpl/api/controllers';

export async function createServer(): Promise<Express> {
  console.debug(`utils::server.ts::createServer()`);
  const yamlSpecFile = './config/openapi.yml';
  const apiDefinition = YAML.load(yamlSpecFile);
  const apiSummary = summarise(apiDefinition);

  const server = express();
  
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDefinition));
  
  const validatorOprions = {
    coerceType: true,
    apiSpec: yamlSpecFile,
    validateRequests: true,
    validateResponses: true
  }

  server.use(OpenApiValidator.middleware(validatorOprions));

  server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status).json({
      error: {
        type: 'request_validation',
        message: err.message,
        errors: err.errors
      }
    });
  });

  const connect = connector(api, apiDefinition, {
    onCreateRoute: (method: string, descriptor: any[]) => {
      descriptor.shift();
      console.log(`${method}: ${descriptor.map((d:any) => d.name).join(', ')}`);
    },
    security: {
      bearerToken: api.auth
    }
  });
  connect(server);

  return server;
}
