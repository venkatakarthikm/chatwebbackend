const mongoose = require("mongoose");
const moment = require('moment-timezone');


const chatsschema = new mongoose.Schema({
    networkid: {
      type: String,
      required: true,
    },
    sender: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    msgtime: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
    },
    read: {
        type: Boolean,
        default: false // Default value for read field
    }

  });

  const Chats = mongoose.model('Chats',chatsschema);

  module.exports = Chats;