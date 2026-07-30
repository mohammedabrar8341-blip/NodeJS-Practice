const express = require("express");
const restaurantArr = require("../utlis/mock_Data");
const app = express();

const addTimeStamps = (req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  req.timeStamps = time;
  next();
};

app.get("/menu/:id", addTimeStamps, (req, res) => {
  console.log("send Menu function called");

  console.log(req.newName);
  const { id } = req.params;

  const targetMenu = restaurantArr.filter((res) => {
    return id === res.id;
  });

  res.json({
    messageRecievedTime: req.timeStamps,
    data: targetMenu,
  });
});

app.get("/menu", addTimeStamps, (req, res) => {
  // console.log("Restaurant menu ");
  res.json({
    messageRecievedTime: req.timeStamps,
    data: ["Mehfil", "Pista house", "Shah Ghouse"],
  });
});

app.listen("8080", () => {
  console.log("Server is listenung at 8080");
});
