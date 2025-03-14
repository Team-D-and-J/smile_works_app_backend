const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const init = require('../init')
const crypto = require('crypto');
const mongoose = require("mongoose");
const userSchema = require("../schemas/schema.user");
const userModel = mongoose.model("User", userSchema);
router.post('/login', async(req, res) =>{
    const { username, password } = req.body;

    try{
        // Find the user in MongoDB
        const user = await userModel.findOne({ _id: username });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Hash the input password with the stored salt
        const hashedInputPassword = crypto.createHash("sha256")
            .update(password + user.salt)
            .digest("hex");

        // Compare the provided password with the stored hashed password
        if (hashedInputPassword !== user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //Generate JWT token
        const token = jwt.sign(
            {id: user._id }, //Payload (data in token)
            init.auth.jwtTokenSecret,{
                expiresIn: init.auth.jwtTokenExpiry
            });
        res.status(200).json({token: token,});
    }
    catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
  
  
});

router.get('/verify', (req, res) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        const tokenParts = token.split(' ');
        token = tokenParts[1];

        // Get shared blacklist from app.js
        const blacklistedTokens = req.app.get("blacklistedTokens");

        if (blacklistedTokens.has(token)) {
            return res.status(401).json({ message: "Token has been logged out" });
        }

        if (jwt.verify(token, init.auth.jwtTokenSecret)) {
            res.status(200).json({ message: 'Token is valid' });
        } else {
            res.status(401).json({ message: 'Token is invalid' });
        }
    } catch (e) {
        res.status(401).json({ message: 'Token is invalid' });
    }
});

// Logout Route
router.post('/logout', (req, res) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    const tokenParts = token.split(' ');
    token = tokenParts[1];

    // Get shared blacklist from app.js
    const blacklistedTokens = req.app.get("blacklistedTokens");

    blacklistedTokens.add(token); // Add token to blacklist

    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
