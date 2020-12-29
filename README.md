# weekly21
Typescript - React - Redux Learning

```
npm i io-ts fp-ts
```

```tsx
// Users.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Users } from './Users';

test('renders Users', () => {
    const users =  [
        {id: 3, name: 'Maximiliano', email: 'maximilianou@gmail.com', website: 'https://github.com/maximilianou', 
        address: { street: 'Roca', suite: 'D', city: 'Buenos Aires', geo: { lat: '-33', lng: '44'}}},
        {id: 5, name: 'Joaquin', email: 'jou@gmail.com', website: 'https://github.com/joaquin', 
        address: { street: '', suite: '', city: '', geo: { lat: '3', lng: '4'}}},
        {id: 7, name: 'Julian', email: 'juu@gmail.com', website: 'https://github.com/julian', 
        address: { street: '', suite: '', city: '', geo: { lat: '1', lng: '2'}}},
//        {id: '13', name: 'Julian', email: 'juu@gmail.com', website: 'https://github.com/julian', 
//        address: { street: '', suite: '', city: '', geo: { lat: 33, lng: 44}}},
//        {id: 15, name: 'Julian', email: 'juu@gmail.com', website: 'https://github.com/julian', 
//        address: { street: '', suite: '', city: '', geo: { lat: 33, lng: 44}}},
    ]; 
    render(<Users users={users} />);
    const elemMax = screen.getAllByText(/Maximiliano/g);
    expect(elemMax[0]).toBeInTheDocument();
    const elemJoa = screen.getAllByText(/Joaquin/g);
    expect(elemJoa[0]).toBeInTheDocument();
    const elemJul = screen.getAllByText(/Julian/g);
    expect(elemJul[0]).toBeInTheDocument();
});

```

```tsx
// Users.tsx
import { isRight } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

const Address = t.type({
    street: t.string,
    suite: t.string,
    city: t.string,
    geo: t.type({ 
        lat: t.string, 
        lng: t.string
    }),
})

const User = t.type({
  id: t.number,
  name: t.string,
  email: t.string,
  website: t.string,
  address : Address,
})

type AddressType = {
    street: string,
    suite: string,
    city: string,
    geo: {
        lat: string,
        lng: string
    }
}

type UserType = {
    id: number,
    name: string,
    email: string,
    website: string,
    address: AddressType
}

type UsersProps = {
    users: UserType[]
}

export const Users: React.FC<UsersProps> = ( { users } ) => (
        <>
          <ul>
              {users.map( (u) => 
                  ( isRight(User.decode(u)) && <li key={u.id}>({u.id}) <span>{u.name}</span>, {u.email}</li>)
                  || 
                  ( !isRight(User.decode(u)) && <li key={u.id}>Not Matching {u.email}</li>)
                  )}
          </ul>
        </>
)

```

 - Create API project structure
```sh
# Makefile
create-api:
	mkdir api && cd api && npm -y init
	cd api && npm i express-openapi-validator	
	cd api && npm i @types/node typescript 
	cd api && npm install ts-node -D
	cd api &&  ./node_modules/.bin/tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2019 --module commonjs --noImplicitAny true
	cd api && mkdir src
	cd api && echo "console.log('Running.. TypeScript app')" > src/app.ts
    cd api && ./node_modules/.bin/tsc
	cd api && node ./bin/app.js
```
 - Run initial 
package.json
```json
  "scripts": {
    "build": "./node_modules/.bin/tsc ",
    "start": "node ./bin/app.js ",
    "dev": "./node_modules/.bin/ts-node ./src/app.ts ",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^14.14.16",
    "express-openapi-validator": "^4.10.1",
    "typescript": "^4.1.3"
  },
  "devDependencies": {
    "ts-node": "^9.1.1"
  }

```

```ts
//server.ts
import express from 'express'
import {Express} from 'express-serve-static-core'

export async function createServer(): Promise<Express> {
  const server = express()
  server.get('/', (req, res) => {
    res.send('Hello world!!!')
  })
  return server
}
```

```ts
//app.ts
import {createServer} from './utils/server'

createServer()
  .then(server => {
    server.listen(3000, () => {
      console.info(`Listening on http://localhost:3000`)
    })
  })
  .catch(err => {
    console.error(`Error: ${err}`)
  })
```


```yml
# config/openapi.yml
openapi: 3.0.3
info:
  title: API example
  description: API example declaration
  termsOfService: http://swagger.io/term/
  contact: 
    email: maximilianou@gmail.com
  license: 
    name: MIT
    url: https://opensource.org/license/MIT
  version: 1.0.0
externalDocs:
  description: Find out more about Swagger
  url: http://swagger.io
servers:
  - url: /api/v1
tags:
  - name: greeting
    description: Greeting APIs
paths:
  /hello:
    get:
      description: Return message to the caller
      tags:
        - greeting
      operationId: hello
      parameters:
        - name: name
          required: false
          in: query
          description: The name of the caller
          schema:
            type: string
      responses:
        200:
          description: success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HelloResponse'
components:
  schemas:
    HelloResponse:
      type: object
      additionalProperties: false
      required: 
        - message
      properties:
        message:
          type: string
```



Reference:

https://losikov.medium.com/backend-api-server-development-with-node-js-from-scratch-to-production-fe3d3b860003

https://cevo.com.au/post/docker-cli-integration-with-amazon-ecs/

https://github.com/piotrwitek/react-redux-typescript-guide

https://dev.to/busypeoples/notes-on-typescript-pick-exclude-and-higher-order-components-40cp

https://www.freecodecamp.org/news/a-mental-model-to-think-in-typescript-2/amp/


- Medical English Vocabulary - 
https://www.englishclub.com/english-for-work/medical-vocabulary.htm

- Web HTML - 
https://www.w3.org/TR/
