"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const taskList = document.getElementById("taskList");
  const createButton = document.getElementById("createButton");

  // タスクの作成
  createButton.addEventListener("click", function() {
    const title = prompt("予定の名前を入力してください");
    const description = prompt("予定の詳細を入力してください");

    const requestData = {
      action: "create",  // actionは"create"のみ
      title: title,
      description: description
    };

    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        alert(data.message);
        // 新しいタスクをリストに追加
        const newTask = document.createElement("li");
        newTask.textContent = `${title}: ${description}`;
        taskList.appendChild(newTask);
      } else {
        alert("エラーが発生しました");
      }
    });
  });
});
