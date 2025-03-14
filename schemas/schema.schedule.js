const schema = require("mongoose").Schema;

const scheduleSchema = {
	_id: { type: String, required: true },
	patientId: { type: String, required: true },
	time: { type: Date, required: true },
	treatment: { type: String, required: true },
	_metadata: {
		createdAt: { type: Date, default: Date.now },
		lastUpdatedAt: { type: Date, default: Date.now, required: true },
		updatedBy: { type: String, required: true },
		isDeleted: { type: Boolean, default: false },
		version: { type: Number, default: 1 },
	},
};

module.exports = schema(scheduleSchema);
