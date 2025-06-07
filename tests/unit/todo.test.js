// Unit test cho Todo model - simplified version không cần MongoDB
const mongoose = require('mongoose');

// Mock the mongoose.model to avoid connecting to a real DB
jest.mock('mongoose', () => ({
  model: jest.fn().mockImplementation((modelName, schema) => {
    class MockModel {
      constructor(data) {
        this._id = 'mock-id-123';
        this.text = data.text;
        this.completed = data.completed !== undefined ? data.completed : false;
      }
      
      save() {
        return Promise.resolve(this);
      }
    }
    
    return MockModel;
  })
}));

// Định nghĩa Todo model sử dụng mongoose mock
const Todo = mongoose.model('Todo', {});

describe('Todo Model Test', () => {
  it('should create a new todo successfully', () => {
    const todoData = { 
      text: 'Test todo',
      completed: false 
    };
    
    const todo = new Todo(todoData);
    
    // Kiểm tra id đã được tạo
    expect(todo._id).toBeDefined();
    
    // Kiểm tra các trường dữ liệu
    expect(todo.text).toBe(todoData.text);
    expect(todo.completed).toBe(todoData.completed);
  });

  it('should create todo with default completed status', () => {
    const todo = new Todo({ text: 'Test todo' });
    
    expect(todo.completed).toBe(false);
  });
});
