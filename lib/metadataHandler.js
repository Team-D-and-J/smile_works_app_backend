const { v4: uuidv4 } = require("uuid");

/**
 * Generate a universally unique identifier (UUID).
 */
function generateId() {
    return uuidv4();
}

/**
 * Create metadata for a new document.
 * @param {Object} req - Express request object containing user details.
 * @returns {Object} Metadata object with default values.
 */
function createMetadata(req) {
    return {
        createdAt: Date.now(),  // Use timestamp for consistency
        lastUpdatedAt: Date.now(),
        updatedBy: req?.user || "system", // Defaults to "system" if no user info
        version: 1,
    };
}

/**
 * Update metadata when modifying an existing document.
 * @param {Object} req - Express request object.
 * @param {Object} metadata - Existing metadata object.
 * @returns {Object} Updated metadata object.
 */
function updateMetadata(req, metadata) {
    if (!metadata) return createMetadata(req);

    return {
        ...metadata,
        lastUpdatedAt: Date.now(),
        updatedBy: req?.user || "system",
        version: metadata.version + 1,
    };
}

module.exports = {
    createMetadata,
    updateMetadata,
    generateId,
};
