const express = require("express");

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const feedback = {
    username: username,
    email: email,
    password: password,
  };
  res.json({
    message: "signup api is working",
    feedback,
  });

});

app.get("/todo", (req, res) => {
  res.json({
    msg: "get requiest is working ",
  });
});
app.post("/todo", (req, res) => {
  const { todo } = req.body;

  res.json({
    msg: "todo added successfully",
  });
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
