const express = require("express");

const server = express();

server.use(express.json());

// "db"
const pseudodb = [
  {
    id: 1,
    title: "lil project",
    tasks: []
  }
];

//rotes
server.get("/projects", (req, res) => {
  res.json(pseudodb);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  pseudodb.push({
    id,
    title,
    tasks: []
  });
  res.json(pseudodb);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = pseudodb.findIndex(x => x.id == id);

  if (index == -1) {
    return res.send("id não encontrado");
  }

  pseudodb[index].title = title;

  res.json(pseudodb);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const index = pseudodb.findIndex(x => x.id == id);

  pseudodb.splice(index, 1);

  res.json(pseudodb);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = pseudodb.findIndex(x => x.id == id);

  pseudodb[index].tasks.push(title);

  res.json(pseudodb);
});

server.listen(3000);
