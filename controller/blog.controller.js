const { blogs, users, Authorship } = require("../index");


const getBlogs = (req, res) => {
    try {
        if (blogs.length > 0) {
            return res.json(blogs);
        } else {
            return res.json({ message: "No blogs found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getBlogById = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        const blog = blogs.find((blog) => {
            return blog.id === Number.parseInt(id);
        });
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: "Blog not found" });
    }
}

const createBlog = (req, res) => {
    try {
        const { title, content } = req.query;
        if (!title || !content) {
            res.status(400).json({ message: "Title and content are required" });
        }
        const blog = blogs.find((blog) => {
            return blog.title === title;
        })

        if (blog) {
            return res.status(400).json({ message: "Blog already exists" });
        }
        const newBlog = {
            id: blogs.length + 1,
            title,
            content
        };
        blogs.push(newBlog);
        res.status(201).json({ message: "Blog created successfully", newBlog });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const updateBlog = (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.query;

        const blog = blogs.find((blog) => {
            return blog.id === Number.parseInt(id);
        })

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        blog.title = title;
        blog.content = content;
        res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteBlog = (req, res) => {
    try {
        const { id } = req.params;
        const blog = blogs.find((blog) => {
            return blog.id === Number.parseInt(id);
        })

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        const index = blogs.indexOf(blog);
        blogs.splice(index, 1);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
