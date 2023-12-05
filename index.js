const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const noteRouter = require('./route/notes.routes');
// app.get("/api/v1", (req, res) => {
//   res.send("Hello World!");
// });
app.use('/api/v1',noteRouter);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Example app listening on port 3000`);
    });
  } catch (error) {
    console.log("app now working");
  }
};
start();
