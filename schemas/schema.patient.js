const schema = require("mongoose").Schema;

const patientSchema = {
	_id: { type: String, required: true },
	name: { type: String, required: true, },
	dob: { type: String, required: true },
	allergies: { type: String },
	medicalHistory: { type: String, required: true },
	insuranceInfo: {
		insuranceProvider: { type: String },
		phoneNumber: { type: String, },
	},
	emergencyInfo: {
		name: { type: String, required: true },
		phoneNumber: { type: Number, required: true, },
	},
	address: {
		street: { type: String },
		city: { type: String },
		state: { type: String },
		zip: { type: String },
	},
	phoneNumber: { type: String, required: true, },
	email: { type: String, required: true },
	billingDetails: {
		cardNumber: { type: String },
		insuranceProvider: { type: String },
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

module.exports = schema(patientSchema);
