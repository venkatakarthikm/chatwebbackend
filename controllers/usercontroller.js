const Users = require("../models/Users")


const checkuserlogin = async (request,response) => 
{
    try
    {
        const input = request.body
        const users = await Users.findOne(input)
        response.json(users)
    }
    catch(error)
    {
        response.status(500).send(error.message);
    }
};

const insertuser = async (request, response) => {
    try 
    {
      const input = request.body;
      const users = new Users(input);
      await users.save();
      response.status(200).send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

module.exports = {checkuserlogin,insertuser}