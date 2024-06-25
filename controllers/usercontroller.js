const Chats = require("../models/Chats");
const Networks = require("../models/Networks");
const Users = require("../models/Users");

const checkuserlogin = async (request, response) => {
  try {
    const input = request.body;
    const users = await Users.findOne(input);
    response.json(users);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const insertuser = async (request, response) => {
  try {
    const input = request.body;
    const users = new Users(input);
    await users.save();
    response.status(200).send('Registered Successfully');
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const searchuser = async (request, response) => {
  try {
    const searchTerm = request.params.searchTerm;
    const users = await Users.find({ username: new RegExp(searchTerm, 'i') });
    if (users.length === 0) {
      response.status(200).send("No User found");
    } else {
      response.json(users);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const searchconnection = async (request, response) => {
  const { userData, receiverData } = request.body;

  try {
    let networks = await Networks.findOne({
      $or: [
        { 'user1.username': userData.username, 'user2.username': receiverData.username },
        { 'user1.username': receiverData.username, 'user2.username': userData.username }
      ]
    });

    if (!networks) {
      networks = new Networks({
        user1: userData,
        user2: receiverData
      });
      await networks.save();
    }
    response.status(200).json(networks);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const sendmessage = async (request, response) => {
  try 
  {
    const input = request.body;
    const chats = new Chats(input);
    await chats.save();
    response.status(200).send('Sent Successfully');
  } 
  catch(e) 
  {
    //console.log(e.message)
    response.status(500).send(e.message);
  }
};

const viewchat = async (request, response) => {
  try {
    const networkId = request.params.networkId;
    // console.log(`Received networkId: ${networkId}`); // Add logging here
    const messages = await Chats.find({ networkid: networkId });

    if (messages.length === 0) {
      response.status(200).send("No Messages");
    } else {
      response.json(messages);
    }
  } catch (error) {
    console.error(error); // Add error logging here
    response.status(500).send(error.message);
  }
};

const updateseen = async (req, res) => {
  try {
    const { _id } = req.params;
    const { readStatus } = req.body; // Assuming readStatus is a boolean value passed in the request body

    // Update the message with the given _id
    const updateResult = await Chats.updateOne({ _id: _id }, { $set: { read: readStatus } });

    if (updateResult.nModified > 0) {
      res.status(200).json({ message: 'Message read status updated successfully' });
    } else {
      res.status(404).json({ message: 'Message not found or no update necessary' });
    }
  } catch (error) {
    console.error('Error updating message read status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { checkuserlogin, insertuser, searchuser, searchconnection,sendmessage,viewchat,updateseen };
