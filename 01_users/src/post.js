const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating a sub document for users model 

const PostSchema = new Schema({
    title: String
});

module.exports = PostSchema;
