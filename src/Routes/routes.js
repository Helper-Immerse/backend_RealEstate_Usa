const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.js");

const UserController = require("../Controller/UserController.js");
const propertyController = require("../Controller/propertyListController.js");
const { authMiddleware } = require("../middleware/auth.js");


router.post("/signUp", UserController.createUser);
router.get("/getUser", UserController.getUser);
router.get("/login",UserController.loginUser);
router.get("/", UserController.getDetails);


// property api's
router.post(
  "/createProperty",
   authMiddleware, 
  upload.array("images", 5), // max 5 images
  propertyController.createProperty
);
router.put("/updateProperty", authMiddleware,   propertyController.updateProperty);
router.delete("/deleteProperty", authMiddleware,   propertyController.deleteProperty);
router.delete("/deleteProperties", authMiddleware,   propertyController.deleteMultipleProperties);
router.get("/getProperties", authMiddleware,   propertyController.getAllProperties);
router.get("/my-properties", authMiddleware,   propertyController.getMyProperties);
router.get("/property/:id", authMiddleware,   propertyController.getPropertyById);
      
module.exports = router;