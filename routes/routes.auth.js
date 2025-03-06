const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const init = require('../init')

router.post('/login', (req, res) =>{
    const body = req.body;
    if(body.password != "1234"){//------------1234 is password test while the real data from database is created
        return res.status(401).json({message: "Invalid credentials"})
    }
    const token = jwt.sign(
        {id: body.username}, //Payload (data in token)
        init.auth.jwtTokenSecret,{
            expiresIn: init.auth.jwtTokenExpiry
        });
    res.status(200).json({token: token,});
});

router.get('/verify', (req, res)=> {
    try{
        let token = req.headers.authorization;
        const tokenParts = token.split(' ');
        token = tokenParts[1];
    
    if(jwt.verify(token, init.auth.jwtTokenSecret)) {
         res.status(200).json({message: 'Token is valid'})
    }
    else{
        res.status(401).json({message: 'Token is invalid'})
    }}
    catch(e){
        res.status(401).json({message: 'Token is invalid'})
    }
})

module.exports = router;