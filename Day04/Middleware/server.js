const express = require("express");
const cros = require("cors");
const restaurantArr = require("../utlis/mock_Data");

const app = express();

let counter = 0;
// rate limiter counter reset
setInterval(() => {
  counter = 0;
}, 5000);

const addTimeStamps = (req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  req.timeStamps = time;
  next();
};

const requestCounter = (req, res, next) => {
  counter++;
  console.log("current request count ", counter);
  next();
};
const rateLimiter = (req, res, next) => {
  if (counter < 6) {
    next();
  } else {
    res.status(429).json({
      msg: "limit exceed",
    });
  }
};

const requestLoggerMiddleware = (req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();

  console.log(".........Request...........");
  console.log("Method is: ", req.method);
  console.log("Route is: ", req.url);
  console.log("Time is: ", time);

  next();
};

app.use(express.json());
app.use(cros());
app.use(addTimeStamps);
app.use(requestLoggerMiddleware);
app.use(requestCounter);
app.use(rateLimiter);
app.get("/menu/:id", addTimeStamps, (req, res) => {
  // console.log("send Menu function called");

  // console.log(req.newName);
  const { id } = req.params;

  const targetMenu = restaurantArr.filter((res) => {
    return id === res.id;
  });

  res.json({
    messageRecievedTime: req.timeStamps,
    data: targetMenu,
  });
});

app.get("/menu", (req, res) => {
  // console.log("Restaurant menu ");
  res.json({
    messageRecievedTime: req.timeStamps,
    data: ["Mehfil", "Pista house", "Shah Ghouse"],
  });
});

app.listen("8080", () => {
  console.log("Server is listenung at 8080");
});
