const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const UserModel = require("../Models/userModel");

async function loginFn(email, password, type) {
    return new Promise(async (resolve, reject) => {
        try {

            // 1. Find user by email
            console.log("email is this", email)
            const user = await UserModel.findOne({ email: email });

            if (!user) {
                return reject({
                    status: 404,
                    message: "User not found"
                });
            }

            // 2. Check user type (optional)
            if (user.type !== type) {
                return reject({
                    status: 403,
                    message: "Invalid user type"
                });
            }

            // 3. Compare password
            const isMatch = await bcryptjs.compare(password, user.password);

            if (!isMatch) {
                return reject({
                    status: 401,
                    message: "Invalid password"
                });
            }

            // 4. Generate JWT token
            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    type: user.type
                },
                'helperimmerse',
                { expiresIn: "7d" }
            );

            // 5. Send response
            resolve({
                message: "Login successful",
                token: token,
                user: {
                    id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    type: user.type
                }
            });

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

module.exports = loginFn;