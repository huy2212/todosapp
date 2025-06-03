const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true });

const Todo = mongoose.model('Todo', {
  text: String,
});

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

app.listen(3000, () => console.log('Server running on port 3000'));
