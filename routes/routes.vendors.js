const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const vendorsSchema = require("../schemas/schema.vendors");
const init = require("../init");

const vendorsCollection = init.modelNames.vendor;
const crud = new mongooseCrud(vendorsCollection, vendorsSchema, {
	paginate: { defaultLimit: 0, maxLimit: 1000 },
});

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
