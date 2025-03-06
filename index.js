const express = require('express');
const app = express();

const port = 3000;

const blogs = [];
const users = [];
const Authorship = [];
module.exports = { blogs, users, Authorship };


const blogRouter = require('./routes/blog.route');
const authorshipRouter = require('./routes/authorship.route');
const userRouter = require('./routes/user.route');
app.use(express.json());

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/authorship', authorshipRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
