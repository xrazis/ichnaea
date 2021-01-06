const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    registered: String,
    lastLogin: Date
});

mongoose.model('User', userSchema);