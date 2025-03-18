const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const mongoose = require("mongoose");
const patientSchema = require("../schemas/schema.patient");
const init = require("../init");

const patientCollection = init.modelNames.patient;
const crud = new mongooseCrud(patientCollection, patientSchema, null);
const Patient = mongoose.model(init.modelNames.patient, patientSchema);

// Define API routes
router.get("/", crud.find);
router.get("/:id", crud.findById);
router.get("/utils/count", crud.count);
router.post("/", crud.create);
router.put("/:id", crud.update);
router.delete("/:id", crud.deleteById);
router.delete("/utils/deleteMany", crud.deleteMany);
router.post("/utils/aggregate", crud.aggregate);

router.get("/search", async (req, res) => {
    try {
        const { name, _id, dob } = req.query;
        if (!name || !_id || !dob) {
            return res.status(400).json({ error: "name, _id, or dob is missing" });
        }
        const filter = {
            name: name,
            _id: _id,
            dob: dob,
        };
        const results = await Patient.find(filter);
        res.status(200).json({ results });
    } catch (error) {
        return res.status(500).json({ status: "Error", message: "Could not find patient." })
    };
});

module.exports = router;
