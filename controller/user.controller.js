const { blogs, users, Authorship } = require("../index");

const getUser = (req, res) => {
    if (users.length > 0) {
        res.json(users);
    } else {
        res.status(404).json({ message: "No users found" });
    }
};

const createUser = (req, res) => {
    try {
        const { id, name, email, password } = req.query;
        if (!id || !name || !email || !password) {
            return res.status(400).json({ message: "Id, name, email and password are required" });
        }
        const user = users.find((user) => {
            return user.id === Number.parseInt(id);
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = {
            id: Number.parseInt(id),
            name,
            email,
            password
        };

        users.push(newUser);
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ message: "Internal Server Error", error: e.message });
    }
};


module.exports = { getUser, createUser };
