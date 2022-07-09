const express = require("express");
const app = express();
app.use(express.json());

const todos = [
];

// Get all todos
app.get("/todos", (req, res) => {
  return res.status(200).json({
    data: todos,
    error: null,
  });
});

// Get one todo
app.get("/todos/:id", (req, res) => {
  try {
    const id = req.params.id;
    const todo = todos.find((todo) => todo.id == id);
    if (todo) {
      return res.status(200).json({
        data: [todo],
        error: null,
      });
    } else {
      return res.status(200).json({
        data: 0,
        error: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      data: null,
      error: error,
    });
  }
});

// Update todo

// Create todo
app.post("/todo", (req, res) => {
  try {
    const { id, item, completed } = req.body;
    
    const newTodo = {
      id,
      item,
      completed,
    };
    todos.push(newTodo);
    return res.status(201).json({
      data: todos,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      error: error,
    });
  }
});

// update todos
app.put("/todos/:id", (req, res) => {
  try {
    const id = req.params.id
    const todo = todos.find((todo) => todo.id == id);
    if(!todo) {
      throw new Error("Todo not found")
    }
    todo.completed = req.body.completed;
    return res.status(201).json({
      data: todo,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      error: error,
    });
  }
});

app.delete("/todos/:id", (req, res) => {
  try {    
    const id = req.params.id
    const todo = todos[0]
    if(todo) {
      todos.splice(id, 1)
    }
    return res.status(200).json({
      data: todos,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      error: error,
    });
  }
});

app.listen(3000, () => console.log("lISTENING"));
