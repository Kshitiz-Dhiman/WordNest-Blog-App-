const { blogs, users, Authorship } = require("../index");

const getBlogs = (req, res) => {
    try {
        if (blogs.length > 0) {
            return res.status(200).json(blogs);
        }
        return res.status(404).json({ message: "No blogs found" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getBlogById = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const blog = blogs.find((blog) => blog.id === Number.parseInt(id));

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json(blog);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const createBlog = (req, res) => {
    try {
        const { id, title, content } = req.query;

        if (!id || !title || !content) {
            return res.status(400).json({ message: "Id, title, and content are required" });
        }

        const blogIdNum = Number.parseInt(id);

        const blog = blogs.find((blog) => blog.id === blogIdNum);

        if (blog) {
            return res.status(400).json({ message: "Blog already exists" });
        }

        const newBlog = {
            id: blogIdNum,
            title,
            content
        };

        blogs.push(newBlog);
        return res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const updateBlog = (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.query;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        if (!title && !content) {
            return res.status(400).json({ message: "At least one field (title or content) is required for update" });
        }

        const blogIdNum = Number.parseInt(id);
        const blog = blogs.find((blog) => blog.id === blogIdNum);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Only update fields that are provided
        if (title) blog.title = title;
        if (content) blog.content = content;

        return res.status(200).json({
            message: "Blog updated successfully",
            blog,
            updatedFields: {
                title: title ? true : false,
                content: content ? true : false
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const deleteBlog = (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }

        const blogIdNum = Number.parseInt(id);
        const blog = blogs.find((blog) => blog.id === blogIdNum);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const index = blogs.indexOf(blog);
        blogs.splice(index, 1);

        // Also delete related authorships
        const relatedAuthorships = Authorship.filter(authorship => authorship.blogId === blogIdNum);
        relatedAuthorships.forEach(authorship => {
            const authorshipIndex = Authorship.indexOf(authorship);
            if (authorshipIndex !== -1) {
                Authorship.splice(authorshipIndex, 1);
            }
        });

        return res.status(200).json({
            message: "Blog deleted successfully",
            relatedAuthorshipsRemoved: relatedAuthorships.length
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
