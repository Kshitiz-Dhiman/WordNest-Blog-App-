const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogRouter = require("./routes/blog.route");
const authorshipRouter = require("./routes/authorship.route");
const userRouter = require("./routes/user.route");


app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/authorship", authorshipRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
