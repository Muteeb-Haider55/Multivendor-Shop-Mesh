const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
require("dotenv").config({
  path: "./.env",
});
app.use(cors());
app.use(express.json());
app.get("/", (req, res, next) => {
  res.send("Helo world");
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (recieverId) => {
  return users.find((user) => user.userId === recieverId);
};

// Define a message object with a seen property
const createMessage = ({ senderId, recieverId, text, images }) => ({
  senderId,
  recieverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  console.log(`a user is connected`);

  //   teke userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  //   send and get message
  const messages = {}; //object to track messages sent to each user

  socket.on("sendMessage", ({ senderId, recieverId, text, images }) => {
    const message = createMessage({ senderId, recieverId, text, images });
    const user = getUser(recieverId);
    // Store the messages in the messages object
    if (!messages[recieverId]) {
      messages[recieverId] = [message];
    } else {
      messages[recieverId].push(message);
    }
    // send message to reciever
    io.to(user?.socketId).emit("getMessage", message);
  });
  socket.on("messageSeen", ({ senderId, recieverId, messageId }) => {
    const user = getUser(senderId);

    //  update the seen flag for the message
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.recieverId === recieverId && message.id === messageId
      );
      if (message) {
        message.seen = true;

        // send a message seen event to the sender
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          recieverId,
          messageId,
        });
      }
    }
  });
  // update and get last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessageId,
    });
  });

  //   when socket disconnected
  socket.on("disconnect", () => {
    console.log(`a user disconnected`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
