const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const JWT_SECRET = "I AM ALIVE";
let users = [];
app.use(express.json());
app.use(cors());

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      msg: "invalid credentials / you are not allowed to access this data",
    });
  }

  try {
    const payLoad = jwt.verify(token, JWT_SECRET);
    req.transferData = payLoad;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "invalid credentials / you are not allowed to access this data",
    });
  }
};

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      msg: "Please fill in all fields",
    });
  }

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

  if (!email || !password) {
    return res.status(400).json({
      msg: "Please enter both email and password",
    });
  }

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
app.use(authMiddleware);
app.get("/me", (req, res) => {
  const payLoad = req.transferData;

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
