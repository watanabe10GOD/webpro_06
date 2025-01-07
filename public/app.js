"use strict";

// 計算ボタンがクリックされたときの処理
document.getElementById("calculate-btn").addEventListener("click", () => {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const operator = document.getElementById("operator").value;

  // フェッチでPOSTリクエストを送信
  fetch("/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"  // JSON形式で送信
    },
    body: JSON.stringify({
      num1: num1,
      num2: num2,
      operator: operator
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.result !== undefined) {
      document.getElementById("result").textContent = "Result: " + data.result;
    } else if (data.error) {
      document.getElementById("result").textContent = "Error: " + data.error;
    }
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("result").textContent = "Error: Unable to calculate.";
  });
});
