# Node Auth React

Example react + node authentication app with jwt

# Installation

1. git clone https://github.com/thousandsofraccoons/node-react-auth
2. cd node-auth
3. Create a `.env` file in the server directory with this content

```
DB_HOST=localhost
DB_NAME=db
DB_PORT=27017
APP_PORT=1234
JWT_SECRET=55ha
```

3. Create a `.env` file in the client directory with this content

```
REACT_APP_BACKEND=http://localhost:1234
```

4. `npm install` for server and client
5. `npm start` for client
6. `npm run dev` for server
