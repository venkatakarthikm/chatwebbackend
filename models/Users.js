const mongoose = require("mongoose")


const usersschema = new mongoose.Schema({
    profilename:{
        type: String,
        required: true
    },
    imagelink: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    userid: {
        type: Number,
        required: true,
        unique: true,
        default: () => generateRandomId()
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
      password: {
        type: String,
        required: true
    },

});

const users = mongoose.model('users',usersschema);

function generateRandomId() {
    return Math.floor(Math.random() * 900000) + 100000;
}

module.exports = users;