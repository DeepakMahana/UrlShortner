const mongoose = require('mongoose');

// Initalize Schema
const Schema = mongoose.Schema

// Define a HashSchema
const HashSchema = new Schema({
    hashKey: {
        type: String,
        required: true,
        unique: true
    },
    isUsed: {
        type: Boolean,
        default: false
    }
})

// Define and Export Model
const Hashs = mongoose.model('Hashs', HashSchema);
module.exports = Hashs;