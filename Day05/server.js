const express = require("express");
const app = express();

app.use(express.json());
let users = [];

function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";
  for (let i = 0; i < 32; i++) {
    token = token + options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

app.post("/signup", (req, res) => {
  const { email, password, username } = req.body;

  const userobj = {
    username,
    password,
    email,
  };

  users.push(userobj);
  console.log(users);

  res.status(200).json({
    msg: "User Registered Successfully",
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  let Founderuser = null;
  Founderuser = users.find((user) => {
    if (user.email === email && user.password === password) {
      return true;
    }
  });
  if (Founderuser) {
    const token = generateToken();
    Founderuser.token = token;

    console.log("db check", users);
    res.status(200).json({
      msg: "login successfully",
      token: token,
    });
  } else {
    res.status(400).json({
      msg: "Invalid username and password",
    });
  }
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`"server is listening at ${PORT}......."`);
});
