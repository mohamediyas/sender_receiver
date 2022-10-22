const express = require("express");
const path = require("path");

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", (socket) => {
  socket.on("sender-join", (data) => {
    socket.join(data.uid);
  });

  socket.on("receiver-join", (data) => {
    console.log(data);
    socket.join(data.uid);

    socket.in(data.sender_uid).emit("init", data.uid);
  });

  socket.on("file-meta", (data) => {
    socket.in(data.uid).emit("fs-meta", data.metadata);
  });

  socket.on("file-start", (data) => {
    socket.in(data.uid).emit("fs-meta", {});
  });
});

server.listen(5000);
