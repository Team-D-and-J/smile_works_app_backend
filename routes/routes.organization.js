const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const organizationSchema = require("../schemas/schema.organization");
const init = require("../init");

const organizationCollection = init.modelNames.organization;
const crud = new mongooseCrud(organizationCollection, organizationSchema, null);

// CRUD Operations
router.get("/", crud.find);
router.get("/:id", crud.findById);
router.get("/utils/count", crud.count);
router.post("/", crud.create);
router.put("/:id", crud.update);
router.delete("/:id", crud.deleteById);
router.delete("/utils/deleteMany", crud.deleteMany);
router.post("/utils/aggregate", crud.aggregate);

module.exports = router;
