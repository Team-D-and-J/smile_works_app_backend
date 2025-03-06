const express = require("express");
const init = require("./init");
const logger = init.logger;

const app = express();
app.use(express.json());

const apiLogger = require("./lib/middleware.apiLogger");
app.use(apiLogger);

const userRouter = require("./routes/routes.user");

(async () => {
    await init.connectToMongoDB();

    app.use("/api/users", userRouter);

    app.listen(init.PORT, async () => {
        logger.info(`Server is running on port ${init.PORT}`);
        await require("./init-scripts/init.user")();
    });
})();
