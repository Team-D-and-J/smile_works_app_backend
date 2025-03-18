const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const userSchema = require("../schemas/schema.user");
const init = require("../init");

const userCollection = init.modelNames.user;
const crud = new mongooseCrud(userCollection, userSchema, null);

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
