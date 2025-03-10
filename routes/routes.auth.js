const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const init = require('../init');

router.post('/login', (req, res) => {
    const body = req.body;
    if (body.password != "1234") {//------------1234 is password test while the real data from database is created
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: body.username }, // Payload
        init.auth.jwtTokenSecret, {
            expiresIn: init.auth.jwtTokenExpiry
        }
    );

    res.status(200).json({ token });
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
