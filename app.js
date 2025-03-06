const express = require('express');
const { PORT } = require('./init');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());//to enable JSON parsing in incoming requests

//Create APIs
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(function (req, res, next) {
    if (req.path.startsWith('/api/auth/login')){
        next();
        return;
    }

    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message: 'Unauthorized'});
    }
    const token = authHeader.split(' ')[1];

    const tokenData= jwt.verify(token, init.auth.jwtTokenSecret);
    if(!tokenData){
        return res.status(401).json({message: 'Unauthorized'});
    }
    next();
});

const authRouter = require('./routes/routes.auth');
const productRouter = require('./routes/routes.productMaster')
const treatmentRouter = require('./routes/routes.treatment');

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/treatments', treatmentRouter);


app.listen(PORT, () => {//command node app.js to run
    console.log(`Server listening on port ${PORT}`);
});