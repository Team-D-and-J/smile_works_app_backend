const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const mongoose = require("mongoose");
const patientSchema = require("../schemas/schema.patient");
const init = require("../init");

const patientCollection = init.modelNames.patient;
const crud = new mongooseCrud(patientCollection, patientSchema, null);
const Patient = mongoose.model(init.modelNames.patient, patientSchema);

// Define API routes
router.get("/:id", crud.findById);
router.get("/utils/count", crud.count);
router.post("/", crud.create);
router.put("/:id", crud.update);
router.delete("/:id", crud.deleteById);
router.delete("/utils/deleteMany", crud.deleteMany);
router.post("/utils/aggregate", crud.aggregate);

router.get("/", async (req, res) => {
    try {
        const { name, dob, _id } = req.query;

        // Build dynamic filter if query params exist
        const filter = {};
        if (name) filter.name = name;
        if (dob) filter.dob = dob;
        if (_id) filter._id = _id;

        const results = await Patient.find(filter);
        res.status(200).json({ results });
    } catch (error) {
        console.error("Error fetching patients:", error);
        return res.status(500).json({ status: "Error", message: "Could not find patient." });
    }
});


module.exports = router;
