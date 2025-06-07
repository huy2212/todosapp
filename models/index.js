
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Todo = mongoose.model('Todo', {
  text: String,
  completed: { type: Boolean, default: false },
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

app.listen(3000, '0.0.0.0', () => console.log('Server running on port 3000'));

app.put('/api/todos/:id', async (req, res) => {
  const { completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(req.params.id, { completed }, { new: true });
  res.json(todo);
});

app.delete('/api/todos', async (req, res) => {
  await Todo.deleteMany({});
  res.json({ message: 'All tasks deleted' });
});
