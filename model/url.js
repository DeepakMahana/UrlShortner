const mongoose = require('mongoose');

// Initalize Schema
const Schema = mongoose.Schema

// Define a HashSchema
const UrlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortenUrl: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// Define and Export Model
const Urls = mongoose.model('Urls', UrlSchema);
module.exports = Urls;