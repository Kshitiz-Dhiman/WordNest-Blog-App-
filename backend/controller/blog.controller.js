const Blog = require("../models/Blog");
const createBlog = async (req, res) => {
    try {  
      const id = req.query.id;
      const title = req.query.title;
      const content = req.query.content;

      
      if (!id || !title || !content) {
        return res.status(400).json({ 
          message: "ID, title, and content are required", 
          receivedBody: req.body,
          receivedQuery: req.query
        });
      }
      
      // Check if a blog with the same ID already exists
      const existingBlog = await Blog.findOne({ id });
      if (existingBlog) {
        return res.status(400).json({ message: "Blog with this ID already exists" });
      }
  
      const newBlog = new Blog({ id, title, content });
      await newBlog.save();
  
      res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };

module.exports = { createBlog };