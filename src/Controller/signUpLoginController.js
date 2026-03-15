const UserModel = require("../Models/signUpAndLoginModel");

exports.createUser = async (req, res) => {
    try {
      console.log("come in controller")
      const author = await UserModel.create(req.body);
      res.status(201).json({ status: true, data: author });
    } catch (err) {
      return res.status(400).json({ status: false, msg: err.message });
    }
  };

  exports.getAuthor = async (req, res) => {
    try {
  
      res.status(201).json({ status: true, data: "author" });
    } catch (err) {
      return res.status(400).json({ status: false, msg: err.message });
    }
  };

  exports.loginAuth = async (req,res) => {
    try{
console.log("coming in login Controller")
const authLogin = req.body;
// console.log("authLogin",authLogin)
res.status(201).json({ status: true, data: authLogin });
    }catch(err){
      console.log(err.message)
    }
  }