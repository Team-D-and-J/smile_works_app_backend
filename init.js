const mongoose = require("mongoose");
const pino = require("pino");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// MongoDB Configuration
const MONGO_URI = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017?directConnection=true";
const MONGO_DB = process.env.MONGO_DB_NAME || "smile_works";

// Logger Setup
const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const logger = pino({
    level: LOG_LEVEL,
    formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
        bindings(bindings) {
            return { hostname: bindings.hostname };
        },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
});

/**
 * Connect to MongoDB
 */
async function connectToMongoDB() {
    logger.info("Connecting to MongoDB...");
    logger.trace(`MongoDB URI: ${MONGO_URI}`);
    logger.trace(`MongoDB DB: ${MONGO_DB}`);

    try {
        await mongoose.connect(MONGO_URI, { dbName: MONGO_DB });
        logger.info("Successfully connected to MongoDB");
    } catch (error) {
        logger.error("Error connecting to MongoDB:", error);
        throw new Error("Database connection failed");
    }
}

// Model Names
const modelNames = {
    user: "User",
    notification: "Notification",
    treatment: "Treatment",
    productMaster: "ProductMaster",
    inventory: "Inventory",
    appointment: "Appointment",
    clinic: "Clinic"
};

// Authentication Config (Merged from both branches)
const auth = {
    jwtTokenSecret: process.env.AUTH_JWT_SECRET || "123",
    jwtTokenExpiry: process.env.AUTH_JWT_DURATION || "1h"
};

// Export Configurations
module.exports = {
    PORT,
    connectToMongoDB,
    LOG_LEVEL,
    logger,
    modelNames,
    auth
};
