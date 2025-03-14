const crypto = require("crypto");
const mongoose = require("mongoose");
const logger = require("../init").logger;
const userSchema = require("../schemas/schema.user");

// Dynamically create the User model
const userModel = mongoose.model("user", userSchema);

let adminUser = {
    _id: "admin",
    name: "Admin",
    email: "admin@smileworks.com",
    password: "123123123",
    phoneNumber: "1234567890",
    salt: null,
    orgID: "org1", 
    address: {
        street: "123 Admin St",
        city: "AdminCity",
        state: "AdminState",
        zip: "00000",
    },
    roles: {
        isPatient: false,
        isDoctor: true,
        isNurse: false,
    },
    billingDetails: {
        cardNumber: "4111111111111111",
        insuranceProvider: "AdminInsurance",
    },
    notificationPreference: {
        allowSMS: true,
        allowEmail: true,
        allowPhoneCall: false,
    },
    _metadata: { updatedBy: "system" },
};

async function addUser(user) {
    let existingUser = await userModel.findById(user._id);
    if (existingUser) {
        logger.debug(`User exists: ${user._id}`);
        return;
    }

    logger.info(`Adding user: ${user._id}`);
    user.salt = Date.now().toString();
    user.password = crypto.createHash("sha256").update(user.password + user.salt).digest("hex");

    await userModel.create(user);
    logger.info(`Added user: ${user._id}`);
}

module.exports = async () => {
    await addUser(adminUser);
};
