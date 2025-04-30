const mongoose = require("mongoose");

const authorshipSchema = new mongoose.Schema({
    blogId: { type: String, ref: 'Blog' },  
    authorId: { type: String, ref: 'User' } 
});

module.exports = mongoose.model("Authorship", authorshipSchema);