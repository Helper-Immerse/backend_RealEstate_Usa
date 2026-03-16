const express = require("express");
const router = express.Router();

const AuthorController = require("../Controller/signUpLoginController");
router.post("/signUp", AuthorController.createUser);
router.get("/getAuthor", AuthorController.getAuthor);
router.get("/login",AuthorController.loginUser);
router.get("/", AuthorController.getDetails);
      
module.exports = router;