const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = "I AM ALIVE";

app.use(express.json());
let users = [];

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const newUserObj = {
    username,
    email,
    password,
  };
  users.push(newUserObj);
  console.log(users);

  res.json({
    msg: "User registered Successfully",
    data: newUserObj,
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  // console.log("from signin", email, password);

  let FilteredUser = null;
  FilteredUser = users.find((userobj) => {
    if (userobj.email == email && userobj.password == password) {
      return true;
    }
  });
  if (FilteredUser == null) {
    return res.json({
      msg: "Invalid users credentials",
    });
  } else {
    const token = jwt.sign({ username: FilteredUser.username }, JWT_SECRET);
    res.json({
      msg: "Login Successfully",
      token: token,
    });
  }
});
app.get("/me", (req, res) => {
  const { token } = req.headers;

  const payLoad = jwt.verify(token, JWT_SECRET);

  if (payLoad == undefined) {
    res.json({
      msg: "invalid credentials / you are not allowed to access this data",
    });
  }
  const verifedUser = users.find((userObject) => {
    if (userObject.username == payLoad.username) {
      return true;
    }
  });

  res.json({
    msg: "You'r eligible to access data",
    data: verifedUser,
  });
});

const PROT = 8080;
app.listen(PROT, () => {
  console.log(`Server is running at ${PROT} ..........`);
});
