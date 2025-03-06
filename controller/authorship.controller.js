const { blogs, users, Authorship } = require("../index");

const getAuthorship = (req, res) => {
    try {
        if (Authorship.length > 0) {
            res.status(200).json(Authorship);
        } else {
            res.status(404).json({ message: "No authorship found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const createAuthorship = (req, res) => {
    try {
        const { blogId, authorId } = req.query;

        if (!blogId || !authorId) {
            return res.status(400).json({ message: "BlogId and authorId are required" });
        }

        const blogIdNum = Number.parseInt(blogId);
        const authorIdNum = Number.parseInt(authorId);

        const blog = blogs.find((blog) => blog.id === blogIdNum);
        const author = users.find((user) => user.id === authorIdNum);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        const isDuplicate = Authorship.find((authorship) => {
            return authorship.blogId === blogIdNum && authorship.authorId === authorIdNum
        });

        if (isDuplicate) {
            return res.status(400).json({ message: "Authorship already exists" });
        }

        const newAuthorship = {
            id: Authorship.length + 1,
            blogId: blogIdNum,
            authorId: authorIdNum
        };

        Authorship.push(newAuthorship);
        res.status(201).json({
            message: "Authorship created successfully",
            authorship: newAuthorship
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



module.exports = { getAuthorship, createAuthorship };
