const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const vendorsSchema = require("../schemas/schema.vendors");

const vendorsCollection = "vendors";
<<<<<<< Updated upstream
const crud = new mongooseCrud(vendorsCollection, vendorsSchema, {
	paginate: { defaultLimit: 0, maxLimit: 1000 },
});
=======
const crud = new mongooseCrud(vendorsCollection, vendorsSchema, null);
>>>>>>> Stashed changes

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
