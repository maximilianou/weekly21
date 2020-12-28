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

Reference:

https://cevo.com.au/post/docker-cli-integration-with-amazon-ecs/


https://github.com/piotrwitek/react-redux-typescript-guide

https://dev.to/busypeoples/notes-on-typescript-pick-exclude-and-higher-order-components-40cp

https://www.freecodecamp.org/news/a-mental-model-to-think-in-typescript-2/amp/


- Medical English Vocabulary - 
https://www.englishclub.com/english-for-work/medical-vocabulary.htm

- Web HTML - 
https://www.w3.org/TR/
