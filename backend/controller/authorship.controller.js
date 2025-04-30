const Authorship = require("../models/Authorship");
const Blog = require("../models/Blog");
const User = require("../models/User");

const getAuthorship = async (req, res) => {
    try {
        const authorships = await Authorship.find().populate("blogId").populate("authorId");
        if (authorships.length > 0) {
            res.status(200).json(authorships);
        } else {
            res.status(404).json({ message: "No authorship found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const createAuthorship = async (req, res) => {
    try {
        const { blogId, authorId } = req.query;

        if (!blogId || !authorId) {
            return res.status(400).json({ message: "BlogId and authorId are required" });
        }

        const blog = await Blog.findOne({ id: blogId });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const author = await User.findOne({ id: authorId });
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        const isDuplicate = await Authorship.findOne({
            blogId: blog._id,
            authorId: author._id
        });

        if (isDuplicate) {
            return res.status(400).json({ message: "Authorship already exists" });
        }

        const newAuthorship = new Authorship({
            blogId: blog._id,
            authorId: author._id
        });
        await newAuthorship.save();

        res.status(201).json({
            message: "Authorship created successfully",
            authorship: newAuthorship,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { getAuthorship, createAuthorship };
