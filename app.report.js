app.post("/calculate", (req, res) => {
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const operation = req.body.operation;
    let result = 0;
    
    // 計算処理
    if (operation === 'add') {
      result = num1 + num2;
    } else if (operation === 'subtract') {
      result = num1 - num2;
    } else if (operation === 'multiply') {
      result = num1 * num2;
    } else if (operation === 'divide') {
      if (num2 === 0) {
        res.json({ error: "Division by zero is not allowed" });
        return;
      }
      result = num1 / num2;
    }
    
    res.json({ result: result });
  });

  app.get("/calculator", (req, res) => {
    res.render("calculator");  // `calculator.ejs`テンプレートをレンダリング
  });
  