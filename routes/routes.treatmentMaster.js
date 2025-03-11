const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const treatmentMasterSchema = require("../schemas/schema.treatmentMaster");

const treatmentMasterCollection = "treatmentMaster"; 
const crud = new mongooseCrud(treatmentMasterCollection, treatmentMasterSchema, null);

// Define API routes
router.get("/", crud.find);
router.get("/:id", crud.findById);
router.get("/utils/count", crud.count);
router.post("/", crud.create);
router.put("/:id", crud.update);
router.delete("/:id", crud.deleteById);
router.delete("/utils/deleteMany", crud.deleteMany);
router.post("/utils/aggregate", crud.aggregate);

module.exports = router;