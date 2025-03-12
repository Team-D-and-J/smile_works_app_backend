const schema = require('mongoose').schema;

const definition = {
	"_id": String,
	"doctorId": {
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
	"treatmentMaster": String,
	"status": {
		"type": String,
		"enum": ["No show", "Confirmed", "Arrived", "Cancelled"],
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
