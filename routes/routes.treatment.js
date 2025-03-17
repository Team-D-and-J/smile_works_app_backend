const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const mongoose = require("mongoose");
const treatmentSchema = require("../schemas/schema.treatment");
const init = require("../init");

const treatmentCollection = init.modelNames.treatment;
const crud = new mongooseCrud(treatmentCollection, treatmentSchema, null);
const Treatment = mongoose.model(init.modelNames.treatment, treatmentSchema)
// Define API routes
router.get("/patient/:patientId", async (req, res) => {
    try {
        const { patientId } = req.params;
        const treatments = await Treatment.find({ patientId, "_metadata.isDeleted": false })
        if (!treatments.length) {
            return res.status(404).json({ message: "No treatments found for this patient." });
        }
        res.status(200).json(treatments)
    } catch (error) {
        console.error("Error fetching treatments:", error);
        res.status(500).json({ message: "Server error" });
    }
})


router.get("/", crud.find);
router.get("/:id", crud.findById);
router.get("/utils/count", crud.count);
router.post("/", crud.create);
router.put("/:id", crud.update);
router.delete("/:id", crud.deleteById);
router.delete("/utils/deleteMany", crud.deleteMany);
router.post("/utils/aggregate", crud.aggregate);

module.exports = router;