const schema = require("mongoose").Schema;


const definition = new schema({
	_id: String,
	doctorId: {
		type: String,
		required: true,
	},
	patientId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	treatmentMaster: String,
	status: {
		type: String,
		enum: ["No show", "Confirmed", "Arrived", "Cancelled"],
		required: true,
	},
	_metadata: {
		createdAt: {
			type: Date,
			default: Date.now,
		},
		lastUpdatedAt: {
			type: Date,
			required: true,
		},
		updatedBy: {
			type: String,
			required: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		version: {
			type: Number,
			default: 1,
		},
	},
});

module.exports = schema(definition);
