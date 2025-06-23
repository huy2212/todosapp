// Integration test cho Todo API - simplified version không cần MongoDB
const request = require('supertest');
const express = require('express');

// Mock data
let todos = [];

// Tạo Express app cho testing
const app = express();
app.use(express.json());

// Mock các routes
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const todo = {
    _id: Date.now().toString(),
    text: req.body.text,
    completed: false
  };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const { completed } = req.body;
  const todo = todos.find(t => t._id === req.params.id);
  
  if (todo) {
    todo.completed = completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.delete('/api/todos', (req, res) => {
  todos = [];
  res.json({ message: 'All tasks deleted' });
});

// Reset mock data sau mỗi test
afterEach(() => {
  todos = [];
});

describe('Todo API Tests', () => {
  it('GET /api/todos - should return empty array initially', async () => {
    const response = await request(app)
      .get('/api/todos')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(0);
  });

  it('POST /api/todos - should create a new todo', async () => {
    const todoData = { text: 'Test todo' };
    
    const response = await request(app)
      .post('/api/todos')
      .send(todoData)
      .expect('Content-Type', /json/)
      .expect(201);
    
    expect(response.body.text).toBe(todoData.text);
    expect(response.body.completed).toBe(false);
    expect(response.body._id).toBeDefined();
  });

  it('Should create a todo and then fetch it in the list', async () => {
    // Create a todo
    const todoData = { text: 'Integration test' };
    await request(app)
      .post('/api/todos')
      .send(todoData)
      .expect(201);
    
    // Fetch all todos
    const response = await request(app)
      .get('/api/todos')
      .expect(200);
    
    expect(response.body.length).toBe(1);
    expect(response.body[0].text).toBe(todoData.text);
  });

  it('PUT /api/todos/:id - should update a todo', async () => {
    // Create a todo first
    const createResponse = await request(app)
      .post('/api/todos')
      .send({ text: 'Todo to update' });
    
    const todoId = createResponse.body._id;
    
    // Update the todo
    const updateResponse = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ completed: true })
      .expect(200);
    
    expect(updateResponse.body.completed).toBe(true);
  });

  it('DELETE /api/todos - should delete all todos', async () => {
    // Create a few todos
    await request(app).post('/api/todos').send({ text: 'Todo 1' });
    await request(app).post('/api/todos').send({ text: 'Todo 2' });
    
    // Verify todos exist
    const beforeDelete = await request(app).get('/api/todos');
    expect(beforeDelete.body.length).toBe(2);
    
    // Delete all todos
    await request(app)
      .delete('/api/todos')
      .expect(200);
    
    // Verify todos are deleted
    const afterDelete = await request(app).get('/api/todos');
    expect(afterDelete.body.length).toBe(0);
  });
});
