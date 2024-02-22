<h1 align="center">Development</h1>

## Dependencies

To install the development dependencies, you can use the following commands:

```bash
npm i
# or
yarn
```

To run the server in development mode, you can use the following command:

```bash
npm run dev
# or
yarn dev
```

## Database

### User
- `id` -> String (UUID, unique)
- `name` -> String
- `email` -> String (unique)
- `password` -> String
- `createdAt` -> Date

### Product
- `id` -> String (UUID, unique)
- `title` -> String
- `description` -> String
- `category` -> String
- `tags` -> String[]
- `features` -> String[]
- `pictures` -> String[]
- `price` -> Number

### Cart
- `id` -> String (UUID, unique)
- `user` -> User
- `userId` -> String (UUID)
- `product` -> Product
- `productId` -> String (UUID)
- `quantity` -> Int

## Tests

To run the tests, you can use the following command:

```bash
npm run test
# or
yarn test
```
