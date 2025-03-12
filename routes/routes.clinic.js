const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const clinicSchema = require("../schemas/schema.clinic");

const clinicCollection = "clinics"; 
const crud = new mongooseCrud(clinicCollection, clinicSchema, null);

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