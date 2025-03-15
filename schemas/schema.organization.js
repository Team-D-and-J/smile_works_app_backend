const schema = require('mongoose').Schema;

const organizationSchema = {
	"_id": {
		"type": String,
		"required": true,
	},
	"name": {
		"type": String,
		"required": true,
	},
	_metadata: {
		"createdAt": {
			"type": Date,
			"default": Date.now
		},
		"lastUpdatedAt": {
			"type": Date,
			"required": true,
			"default": Date.now
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

module.exports = schema(organizationSchema);
