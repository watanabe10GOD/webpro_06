"use strict";
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


let tasks = [];
let taskId = 1;  

app.post('/tasks', (req, res) => {
  const { action, title, description } = req.body;  

  if (action === "create") {
    const newTask = { id: taskId++, title, description };  
    tasks.push(newTask);
    res.json({ status: "success", message: "予定が作成されました", taskId: newTask.id });
  } else {
    res.json({ status: "error", message: "エラーが発生" });
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'task.html')); 
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
