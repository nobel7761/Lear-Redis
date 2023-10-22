const express = require("express");
const redis = require("redis");

const app = express();

app.listen(3001, () => {
  console.log("Publisher Server Started on 3001");
});

//! connect the server with redis
let publisher = redis.createClient({
  url: "redis://localhost:6379",
});

publisher.on("error", (error) => console.log("Redis Error"));
publisher.on("connect", (error) => console.log("Redis Connected"));

const connect = async () => {
  await publisher.connect();
};

connect();

//! create a route. so that by hitting that route something will happen

app.get("/", (req, res) => {
  res.send({
    message: "Publisher Activated from port 3001",
  });
});

//! hit the route using redis
app.get("/publish", async (req, res) => {
  const id = Math.floor(Math.random() * 10);

  const data = {
    id,
    message: `Message - ${id}`,
  };

  console.log("Publish data: ", data);

  // publishing "data"
  await publisher.publish("Nobel", JSON.stringify(data)); //converting json data into string as it will take only string

  res.send({
    message: "Data Published!",
    data,
  });
});
