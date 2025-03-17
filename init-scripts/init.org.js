const crypto = require("crypto");
const mongoose = require("mongoose");
const logger = require("../init").logger;
const organizationSchema = require("../schemas/schema.organization");

// Dynamically create the User model
const organizationModel = mongoose.model("organization", organizationSchema);

let orgData = {
    _id: "sampleOrg",
    name: "SampleOrg",
    _metadata: { updatedBy: "system" },
};

async function addOrg(org) {
    let existingOrg = await organizationModel.findById(org._id);
    if (existingOrg) {
        logger.debug(`Org exists: ${org._id}`);
        return;
    }

    logger.info(`Adding org: ${org._id}`);
    await organizationModel.create(org);
    logger.info(`Added org: ${org._id}`);
}

module.exports = async () => {
    await addOrg(orgData);
};
