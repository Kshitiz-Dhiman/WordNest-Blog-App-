const Blog = require("../models/Blog");

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const updatedBlog = await Blog.findOneAndUpdate({ id }, { title, content }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blog.findOneAndDelete({ id });
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully", blog: deletedBlog });
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ message: "Internal Server Error", error: e.message });
    }
}

const createBlog = async (req, res) => {
    try {
        const { id, title, content } = req.body;

        if (!id || !title || !content) {
            return res.status(400).json({
                message: "ID, title, and content are required",
                receivedBody: req.body,
                receivedQuery: req.query
            });
        }

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

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog };
