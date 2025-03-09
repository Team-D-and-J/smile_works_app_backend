const express = require("express");
const init = require("./init");
const logger = init.logger;
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json()); // Enable JSON parsing in incoming requests

const apiLogger = require("./lib/middleware.apiLogger");
app.use(apiLogger);

const userRouter = require("./routes/routes.user");
const notificationRouter = require("./routes/routes.notification");
const authRouter = require("./routes/routes.auth");
const treatmentRouter = require("./routes/routes.treatment");
const productMasterRouter = require("./routes/routes.productMaster");
const inventoryRouter = require("./routes/routes.inventory");

// Middleware for protecting routes (except login)
app.use(function(req, res, next) {
    if (req.path.startsWith("/api/auth/login")) {
        next();
        return;
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const token = authHeader.split(" ")[1];
        const tokenData = jwt.verify(token, init.auth.jwtTokenSecret);
        if (!tokenData) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
});

(async () => {
    await init.connectToMongoDB();

    app.use("/api/users", userRouter);
    app.use("/api/notifications", notificationRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/treatments", treatmentRouter);
    app.use("/api/products", productMasterRouter);
    app.use("/api/inventory", inventoryRouter);


    app.listen(init.PORT, async () => {
        logger.info(`Server is running on port ${init.PORT}`);
        await require("./init-scripts/init.user")();
    });
})();
