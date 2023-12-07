const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
const authMiddleware = require('./middleware/auth');

const noteRouter = require('./route/notes.routes');
const userRouter = require('./route/user.route');

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/v1/note', authMiddleware, noteRouter);
app.use('/api/v1/auth',userRouter);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app listening on port 3000`);
    });
  } catch (error) {
    console.log("app now working");
  }
};
start();
