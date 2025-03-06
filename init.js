const PORT = process.env.PORT || 3000;

module.exports ={
    PORT,
    auth: {
        jwtTokenSecret: process.env.AUTH_JWT_SECRET || "123",
        jwtTokenExpiry: process.env.AUTH_JWT_DURATION || "1h"
    }
}