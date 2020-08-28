const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

const app = express();
app.use(cors())

//Models
const users = require("./routes/api/users");
const games = require("./routes/api/games");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);




const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there


//Socket.io
var server = app.listen(port, () => console.log(`Server up and running on port ${port} !`));
var io = require('socket.io').listen(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});


io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('id', socket.id)

  socket.on('userid', (data) => {
    console.log(data);
  })
});


//Routes
app.use("/api/users", users);
app.use("/api/games", games);

