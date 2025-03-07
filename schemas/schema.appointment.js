const schema = require('mongoose').schema;

const definition = {
	"_appointmentId": String,
	"dentistId": {
		"type": String,
		"required": String,
	},
	"patientId": {
		"type": String,
		"required": true,
	},
	"date": {
		"type": Date,
		"required": true,
	},
	"time": { // Format -> HH:mm
		"type": String,
		"required": true,
	},
	"treatmentMaster": String,
	"status": {
		"type": Boolean,
		"required": true,
	},
	_metadata: {
		"createdAt": {
			"type": Date,
			"default": new Date()
		},
		"lastUpdatedAt": {
			"type": Date,
			"required": true,
		},
		"updatedBy": {
			"type": String,
			"required": true,

		},

		"isDeleted": {
			"type": Boolean,
			"default": false,
		},
		"version": {
			"type": Number,
			"default": 1
		}
	}

}

module.exports = schema(definition);
