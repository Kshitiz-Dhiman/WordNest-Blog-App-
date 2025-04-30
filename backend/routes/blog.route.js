const express = require("express");
const router = express.Router();

const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require("../controller/blog.controller");

// router.get("/get-blog", getBlogs);
// router.get("/get-blog/:id", getBlogById);
router.post("/create-blogs", createBlog)
// router.put("/update-blog/:id", updateBlog);
// router.delete("/delete-blog/:id", deleteBlog);

module.exports = router;
