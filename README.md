# server 2

`express` is an awesome package that makes creating servers in nodejs a breeze

install:

```zsh
npm install express body-parser morgan
```

- `express` - a framework for building servers
- `body-parser` - a middleware that parses incoming requests
- `morgan` - a middleware for logging incoming requests

## install `httpie`

```zsh
brew install  httpie
```

this allows us to make http `GET` and `POST`

```zsh
# get http from any url
https httpie.io/hello
```

## creating a simple api

```js
// server.mjs
import express from 'express';
import morgan from 'morgan';
import bp from 'body-parser';

const { urlencoded, json } = bp;

const db = {
	todos: [],
};

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan('dev'));

app.get('/todo', (req, res) => {
	res.json({ data: db.todos });
});

app.post('/todo', (req, res) => {
	const newTodo = { complete: false, id: Date.now(), text: req.body.text };
	db.todos.push(newTodo);

	res.json({ data: newTodo });
});

app.listen(8000, () => {
	console.log('Server on http://localhost:8000');
});
```

Run the server:

```zsh
node  server.mjs
```

Make a get or post request:

```zsh
#  get
http :8000/todo

# post
http POST :8000/todo text="make some food today"
```

Output:

```zsh
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 97
Content-Type: application/json; charset=utf-8
Date: Wed, 31 May 2023 22:13:27 GMT
ETag: W/"61-lk8Y15vsV0Lml6wT/WxT51bMmK0"
Keep-Alive: timeout=5
X-Powered-By: Express

[
    {
        "id": 1685571164020,
        "text": "eat more food today"
    },
    {
        "id": 1685571200616,
        "text": "clean my closet"
    }
]
```

Getting specific id

```zsh
➜  nodejs-v2 git:(main) ✗ http :8000/todo/1685572052281
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 54
Content-Type: application/json; charset=utf-8
Date: Wed, 31 May 2023 22:40:41 GMT
ETag: W/"36-mhReQxdvgVgovcEi4iNhkqqEa+w"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "data": {
        "id": 1685572052281,
        "text": "clean my closet"
    }
}

```

## Deploy server

Add a start script to `package.json` and also add the node version you are using

```json
"scripts": {
  "start": "node ./server.mjs"
},

"engines": {
  "node": "v18.16.0"
}
```

Remove hardcoded port `8000` change it to `process.env.PORT`

```js
process.env.PORT;
```

Install heroku and use cli

```zsh
# login
heroku login

# then create heroku app
heroku create
```
