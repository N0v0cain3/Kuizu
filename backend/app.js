const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const User = require("./api/models/user");
require("dotenv").config();

const database = require("./config/database");

const logResponseBody = require("./utils/logResponse");


var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("trust proxy", 1);
var limiter = new rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message:
    "Too many requests created from this IP, please try again after an hour",
});
app.use(limiter);

// const passport_config = require("./api/config/studentGoogleAuth");

mongoose.Promise = global.Promise;

//Use helmet to prevent common security vulnerabilities
app.use(helmet());


//Use body-parser to parse json body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(cors());



// ADD ROUTERS

app.use("/user", require("./api/routers/user"));






app.get("/checkServer", (req, res) => {
  return res.status(200).json({
    message: "Server is up and running",
  });
});


//This function will give a 404 response if an undefined API endpoint is fired
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//

//sockets

//to keep connection alive
function sendHeartbeat() {
  setTimeout(sendHeartbeat, 8000);
  io.sockets.emit("ping", { beat: 1 });
}

io.on("connection", (sc) => {
  console.log(`Socket ${sc.id} connected.`);

  io.sockets.emit("connect", `Socket ${sc.id} connected.`);
  sc.on("pong", function (data) {
    console.log("Pong received from client");
  });
  sc.on("disconnect", () => {
    console.log(`Socket ${sc.id} disconnected.`);
  });

  sc.on("like", async (userId, teamId) => {
    await Like.updateOne(
      { teamId },
      { $addToSet: { likes: userId } },
      { new: true }
    )
      .then((result) => {
        // console.log(result)
        io.sockets.emit("count", { teamId: result.likes.length });
      })
      .catch((e) => {
        console.log(e.toString());
      });
  });
  setTimeout(sendHeartbeat, 8000);
});

const PORT = process.env.PORT || 3000;

//Start the server
http.listen(PORT, function () {
  console.log(`listening on PORT: ${PORT}`);
});

// module.exports = app;

