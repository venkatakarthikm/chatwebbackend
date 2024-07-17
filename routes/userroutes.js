const express = require("express");
const usercontroller = require("../controllers/usercontroller");

const userrouter = express.Router();

userrouter.post("/checkuserlogin", usercontroller.checkuserlogin);
userrouter.post("/insertuser", usercontroller.insertuser);
userrouter.get("/searchuser/:searchTerm", usercontroller.searchuser);
userrouter.post("/searchconnection", usercontroller.searchconnection);
userrouter.post("/sendmessage",usercontroller.sendmessage);
userrouter.get("/viewchat/:networkId", usercontroller.viewchat);
userrouter.post("/updateseen/:_i",usercontroller.updateseen);
userrouter.get("/connections/:searchTerm", usercontroller.connections);



module.exports = userrouter;
