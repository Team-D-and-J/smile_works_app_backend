const express = require("express");
const init = require("./init");
const cors = require("cors");
const logger = init.logger;
const jwt = require("jsonwebtoken");
const { createMetadata, updateMetadata, generateId } = require('./lib/metadataHandler')

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing in incoming requests

const apiLogger = require("./lib/middleware.apiLogger");
app.use(apiLogger);

const organizationRouter = require("./routes/routes.organization");
const userRouter = require("./routes/routes.user");
const notificationRouter = require("./routes/routes.notification");
const authRouter = require("./routes/routes.auth");
const treatmentRouter = require("./routes/routes.treatment");
const treatmentMasterRouter = require("./routes/routes.treatmentMaster");
const productMasterRouter = require("./routes/routes.productMaster");
const inventoryRouter = require("./routes/routes.inventory");
const insuranceRouter = require("./routes/routes.insurance");
const patientRouter = require("./routes/routes.patient");
const purchaseOrdersRouter = require("./routes/routes.purchaseOrders");
const scheduleRouter = require("./routes/routes.schedule");
const billingRouter = require("./routes/routes.billing");

const vendorsRouter = require("./routes/routes.vendors");

// Store blacklisted tokens in memory
const blacklistedTokens = new Set();
app.set("blacklistedTokens", blacklistedTokens);
const clinicRouter = require("./routes/routes.clinic");

// Middleware for protecting routes (except login and logout)
app.use(function (req, res, next) {
    if (req.path.startsWith("/api/auth/login") || req.path.startsWith("/api/auth/logout")) {
        next();
        return;
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    try {
        const token = authHeader.split(" ")[1];

        // Check if token is blacklisted (user logged out)
        if (blacklistedTokens.has(token)) {
            return res.status(401).json({ message: "Unauthorized - Token has been logged out" });
        }

        const tokenData = jwt.verify(token, init.auth.jwtTokenSecret);
        if (!tokenData) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        const decoded = jwt.decode(token);
        req.user = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
});

// **Middleware 2: Metadata Handling (For POST and PUT Requests)**
app.use((req, res, next) => {
    if (req.method === "POST" || req.method === "PUT") {
        if (!req.body._id) {
            req.body._id = generateId();
        }
        req.body._metadata = req.body._metadata
            ? updateMetadata(req, req.body._metadata)
            : createMetadata(req);
    }
    next();
});

(async () => {
    await init.connectToMongoDB();

    app.use("/api/organizations", organizationRouter);
    app.use("/api/users", userRouter);
    app.use("/api/notifications", notificationRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/treatments", treatmentRouter);
    app.use("/api/treatmentmaster", treatmentMasterRouter);
    app.use("/api/products", productMasterRouter);
    app.use("/api/inventory", inventoryRouter);
    app.use("/api/insurance", insuranceRouter);
    app.use("/api/clinics", clinicRouter);
    app.use("/api/schedule", scheduleRouter);
    app.use("/api/patient", patientRouter);
    app.use("/api/purchaseOrders", purchaseOrdersRouter);
    app.use("/api/billing", billingRouter);

    app.use("/api/vendors", vendorsRouter);

    app.listen(init.PORT, async () => {
        logger.info(`Server is running on port ${init.PORT}`);
        await require("./init-scripts/init.org")();
    });
})();
