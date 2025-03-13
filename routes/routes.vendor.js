const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const vendorSchema = require("../schemas/schema.vendors");

const vendorCollection = "vendors"; 
const crud = new mongooseCrud(vendorCollection, vendorSchema, null);

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
