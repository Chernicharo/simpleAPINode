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
let reqCount = 0;

// global middleware, count requests
server.use((req, res, next) => {
  reqCount++;
  console.log(`Request Count: ${reqCount}`);

  next();
});

// local middleware to check id
function checkID(req, res, next) {
  const { id } = req.params;
  const index = pseudodb.findIndex(x => x.id == id);

  if (index == -1) {
    return res.status(400).json({ error: "Invalid id" });
  }
  req.id = id;
  req.index = index;
  return next();
}

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

server.put("/projects/:id", checkID, (req, res) => {
  const { title } = req.body;

  pseudodb[req.index].title = title;

  res.json(pseudodb);
});

server.delete("/projects/:id", checkID, (req, res) => {
  pseudodb.splice(req.index, 1);

  res.json(pseudodb);
});

server.post("/projects/:id/tasks", checkID, (req, res) => {
  const { title } = req.body;

  pseudodb[req.index].tasks.push(title);

  res.json(pseudodb);
});

server.listen(3000);
