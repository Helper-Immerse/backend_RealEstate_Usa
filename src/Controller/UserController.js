const UserModel = require("../Models/userModel");
const loginFn = require("../logic/login");
const bcryptjs = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {

    const password = req.body.password;

    let hashedPassword = await bcryptjs.hash(password , 10)
    req.body.password = hashedPassword;
    console.log("coming",password)
    const Newuser = await UserModel.create(req.body);
    res.status(201).json({ status: true, data: Newuser });
  } catch (err) {
    return res.status(400).json({ status: false, msg: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {

    res.status(201).json({ status: true, data: "User" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: err.message });
  }
};

exports.getDetails = async (req, res) => {
  try {
    res.status(201).json({ status: true, data: "hi this is working" });
  } catch (err) {
    return res.status(400).json({ status: false, msg: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log("coming in login Controller")
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;

    const loginResult =  await loginFn(email,password,type).catch((err)=>{
      res.status(403).json({status: true, data: err.message});
    });

    if(loginResult) {
     res.status(201).json({ status: true, data: loginResult });
    }else {
      res.status(403).json({status: true, data:"Not able to login"})
    }
 



    // const authLogin = req.body.email;
    // console.log("authLogin",authLogin)
    //śres.status(201).json({ status: true, data: authLogin });
  } catch (err) {
    console.log(err.message)
  }
}