const schema = require("mongoose").Schema;

const notificationSchema = {
    notificationId: { type: String, required: true, unique: true },
    userId: { type: String, required: true }, 
    notificationType: {
        sms: { status: { type: String, enum: ["pending", "sent", "failed"] }, isEnabled: { type: Boolean, default: true } },
        phone: { status: { type: String, enum: ["pending", "sent", "failed"] }, isEnabled: { type: Boolean, default: true } },
        email: { status: { type: String, enum: ["pending", "sent", "failed"] }, isEnabled: { type: Boolean, default: true } }
    },
    messageContent: { type: String, required: true },
    status: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
    sentAt: { type: Date, default: null },
    _metadata: {
        createdAt: { type: Date, default: Date.now },
        lastUpdatedAt: { type: Date, default: Date.now },
        updatedBy: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
        version: { type: Number, default: 1 },
    },
};


module.exports = schema(notificationSchema);
