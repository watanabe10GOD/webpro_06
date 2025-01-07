"use strict";
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// 'public' フォルダを静的ファイルの提供元として設定
app.use(express.static(path.join(__dirname, 'public')));

// タスクの作成処理
let tasks = [];
let taskId = 1;  // taskId はletで宣言します

app.post('/tasks', (req, res) => {
  const { action, title, description } = req.body;  // ここではtaskIdを変更しません

  if (action === "create") {
    const newTask = { id: taskId++, title, description };  // taskIdをインクリメント
    tasks.push(newTask);
    res.json({ status: "success", message: "予定が作成されました", taskId: newTask.id });
  } else {
    res.json({ status: "error", message: "エラーが発生" });
  }
});

// ルート（'/'）にアクセスしたとき、task.htmlを返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'task.html')); // public内のtask.htmlを返す
});

// サーバーを起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
