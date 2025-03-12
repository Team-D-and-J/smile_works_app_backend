const schema = require("mongoose").Schema;

const patientSchema = {
	_id: { type: String, required: true },
	productId: { type: String, required: true, },
	name: { type: String, required: true, unique: true },
	unitOfMeasure: { type: String, required: true },
	unitPrice: { type: Number, required: true },
	requestedQuantity: { type: Number, required: true },
	receivedQuantity: { type: Number, required: true },
	isReceived: { type: Boolean, required: true },
	orderStatus: { type: String, enum: ["Ordered", "Not ordered", "Pending"] },
	_metadata: {
		createdAt: { type: Date, default: Date.now },
		lastUpdatedAt: { type: Date, default: Date.now, required: true },
		updatedBy: { type: String, required: true },
		isDeleted: { type: Boolean, default: false },
		version: { type: Number, default: 1 },
	},
};

module.exports = schema(patientSchema);
