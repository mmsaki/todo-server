import express from 'express';
import morgan from 'morgan';
import bp from 'body-parser';

const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan('dev'));

const db = [];

app.post('/todo', (req, res) => {
	const newTodo = {
		id: Date.now(),
		text: req.body.text,
	};

	db.push(newTodo);

	res.json(newTodo);
});

app.get('/todo', (req, res) => {
	res.json(db);
});

// get a specific id
app.get('/todo/:id', (req, res) => {
	const todo = db.find((t) => t.id === +req.params.id);
	res.json({ data: todo });
});

app.listen(process.env.PORT, () => {
	console.log(`Server on http://localhost:8000`);
});
