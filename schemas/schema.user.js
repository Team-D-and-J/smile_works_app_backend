const schema = require('mongoose').schema;

const definition = {
	"_userId": String,
	"name": {
		"type": String,
		"required": true,
	},
	"password": {
		"type": String,
		"required": true,
	},
	"salt": {
        "type": String,
        "required": true,
    },
    "orgID": {
        "type": schema.Types.ObjectId,
		"ref": "Organization",
        "required": true,
    },
    "roles": {
        "isPatient": {
			"type": Boolean,
			"required": false,
		},
		"isDoctor": {
			"type": Boolean,
			"required": false,
		},
		"isNurse": {
			"type": Boolean,
			"required": false,
		},
    },
    "notificationPreference": {
        "type": Boolean,
        "required": false,
    },
	"phoneNumber": {
		"type": Number,
		"required": true,
	},
    "email": {
        "type": String,
		"required": true,
		"unique": true
    },
    "billingDetails": {
        "type": String,
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