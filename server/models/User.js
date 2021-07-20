const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    registered: Date,
    lastLogin: Date,
    socketID: String,
});

mongoose.model('User', userSchema);