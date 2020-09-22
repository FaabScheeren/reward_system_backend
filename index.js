const dotenv = require("dotenv");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const run = require("./functions/sendingEmail");

// Connection with Mongodb
// mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We're connected!");
});

const loggerMiddleWare = require("morgan");
const bodyParserMiddleWare = express.json();
// const corsMiddleWare = require("cors");

// app.use(loggerMiddleWare("dev"));
app.use(bodyParserMiddleWare);
// app.use(corsMiddleWare());

const inviteeRouter = require("./routers/inviteeRouter");
const inviterRouter = require("./routers/inviterRouter");

app.use("/invitee", inviteeRouter);
app.use("/inviter", inviterRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
