const redis = require("redis");

//! we will develop a feature when project A will publish something then automatically project B will get it.
//! which means project B will subscribe project A.
//! to achieve this, we need to develop a function in project B that will listen project A all the time. I mean, this function will be called all the time

// anonymous function
// at the end of this function we are calling it.
(async () => {
  //! connect the server with redis
  let subscriber = redis.createClient({
    url: "redis://localhost:6379",
  });

  subscriber.on("error", (error) => console.log("Redis Error"));
  subscriber.on("connect", (error) => console.log("Redis Connected"));

  //! connect subscriber

  //! approach 1
  //   await subscriber.connect()

  //! approach 2
  const connect = async () => {
    await subscriber.connect();
  };

  connect();

  //! connect subscriber with publish with the name
  await subscriber.subscribe("Nobel", (data) => {
    console.log(data);
  });
})();
