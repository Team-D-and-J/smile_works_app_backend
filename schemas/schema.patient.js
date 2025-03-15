const schema = require("mongoose").Schema;

const patientSchema = {
	_id: { type: String, required: true },
	name: { type: String, required: true, unique: true },
	dob: { type: Date, required: true },
	allergies: { type: String },
	medicalHistory: { type: String, required: true },
	insuranceInfo: {
		insuranceProvider: { type: String },
		phoneNumber: { type: String, unique: true },
	},
	emergencyInfo: {
		name: { type: String, required: true },
		phoneNumber: { type: Number, required: true, unique: true },
	},
	address: {
		street: { type: String },
		city: { type: String },
		state: { type: String },
		zip: { type: String },
	},
	phoneNumber: { type: String, required: true, unique: true },
	_metadata: {
		createdAt: { type: Date, default: Date.now },
		lastUpdatedAt: { type: Date, default: Date.now, required: true },
		updatedBy: { type: String, required: true },
		isDeleted: { type: Boolean, default: false },
		version: { type: Number, default: 1 },
	},
};

module.exports = schema(patientSchema);
