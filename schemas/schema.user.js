const schema = require("mongoose").Schema;

const userSchema = {
    _id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, default: () => Date.now().toString() },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    orgID: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
    },
    roles: {
        isDoctor: { type: Boolean, default: false },
        isNurse: { type: Boolean, default: false },
    },
    notificationPreference: {
        allowSMS: { type: Boolean, default: true },
        allowEmail: { type: Boolean, default: true },
        allowPhoneCall: { type: Boolean, default: false },
    },
    _metadata: {
        createdAt: { type: Date, default: Date.now },
        lastUpdatedAt: { type: Date, default: Date.now, required: true },
        updatedBy: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
        version: { type: Number, default: 1 },
    },
};

module.exports = schema(userSchema);
