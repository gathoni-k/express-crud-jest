const request = require("supertest");
const crypto = require("crypto")
const baseURL = "http://localhost:3000";
const newTodo = {
  id: crypto.randomUUID(),
  item: "Drink water",
  completed: false,
}
describe("GET /todos", () => {
  const newTodo = {
    id: crypto.randomUUID(),
    item: "Drink water",
    completed: false,
  }
  beforeAll(async () => {
    // set up the todo
   await request(baseURL).post("/todo").send(newTodo);
  })
  afterAll(async () => {
   await request(baseURL).delete(`/todo/${newTodo.id}`)
  })
  it("should return 200 ", async () => {
    const response = await request(baseURL).get("/todos");
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
  });

  it("should return todos", async () => {
    const response = await request(baseURL).get("/todos");
    expect(response.body.data.length >= 0).toBe(true);
  });
});

describe("POST /todos", () => {
  const newTodo = {
    id: crypto.randomUUID(),
    item: "Drink water",
    completed: false,
  }
  afterAll(async () => {
   await request(baseURL).delete(`/todo/${newTodo.id}`)
  })

  it("should add an item to todos array", async () => {
    const response = await request(baseURL).post("/todo").send(newTodo);
    const lastItem = response.body.data[response.body.data.length-1]
    expect(response.statusCode).toBe(201);
    expect(lastItem.item).toBe(newTodo["item"]);
    expect(lastItem.completed).toBe(newTodo["completed"]);
  });
});

describe("Get one todo", () => {
  const newTodo = {
    id: crypto.randomUUID(),
    item: "Drink water",
    completed: false,
  }
  beforeAll(async () => {
    // set up the todo
   await request(baseURL).post("/todo").send(newTodo);
  })
  afterAll(async () => {
    // set up the todo
   await request(baseURL).delete(`/todo/${newTodo.id}`)
  })
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/todos/${newTodo.id}`);
    expect(response.statusCode).toBe(200);
  });
  it("should return one item", async () => {
    const response = await request(baseURL).get(`/todos/${newTodo.id}`);
    expect(response.body.data.length == 1).toBe(true);
  });
});

describe("Update one todo", () => {
  const newTodo = {
    id: crypto.randomUUID(),
    item: "Drink water",
    completed: false,
  }
  beforeAll(async () => {
    // set up the todo
   await request(baseURL).post("/todo").send(newTodo);
  })
  afterAll(async () => {
    // set up the todo
   await request(baseURL).delete(`/todo/${newTodo.id}`)
  })
  it("should update item if it exists", async () => {
    const response = await request(baseURL).put(`/todos/${newTodo.id}`).send({
      completed: true,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.data.completed).toBe(true);
  });
});

describe("Delete one todo", () => {
  const newTodo = {
    id: crypto.randomUUID(),
    item: "Drink water",
    completed: false,
  }
  beforeAll(async () => {
    // set up the todo
   await request(baseURL).post("/todo").send(newTodo);
  })
  it("should delete one item", async () => {
    const todoId = 0
    const response = await request(baseURL).delete(`/todos/${newTodo.id}`);
    const todos = response.body.data
    const exists = todos.find(todo => {
      newTodo.id == todoId
    })
    expect(exists).toBe(undefined)
  });
});
