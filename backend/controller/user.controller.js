const User = require("../models/User");

const getUser = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { id, name, email, password } = req.body;

        if (!id || !name || !email || !password) {
            return res.status(400).json({ message: "Id, name, email and password are required" });
        }

        const existingUser = await User.findOne({ id });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ id, name, email, password });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { getUser, createUser };
