import express from "express";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const todos = [
  {
    id: 1,
    title: "First Task",
  },
];

// GET request to root
app.get("/", (req, res) => {
  res.json({});
});

// GET request to fetch all todos
app.get("/todos", (req, res) => {
  const todosCopy = [...todos];
  res.json(todosCopy);
});

// POST request to create a new todo
app.post("/todos", (req, res) => {
  const title = req.body.title;
  const todo = { id: todos.length + 1, title: title };
  todos.push(todo);
  res.status(201).json(todo); // Return 201 Created status
});

// PUT request to update an existing todo
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const todo = todos.find((todo) => todo.id == id);
  if (todo) {
    // Check if todo exists
    todo.title = title;
    res.status(200).json(todo); // Return updated todo
  } else {
    res.status(404).json({ message: "Todo not found" }); // Return 404 if not found
  }
});

// DELETE request to remove a todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.status(204).send(); // Return 204 No Content status on success
  } else {
    res.status(404).json({ message: "Todo not found" }); // Return 404 if not found
  }
});

// Start the server
app.listen(3000, () => {
  console.log("App running on port 3000");
});
