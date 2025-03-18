const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const mongoose = require("mongoose");
const billingSchema = require("../schemas/schema.billing");
const init = require("../init");

const billingCollection = init.modelNames.billing;
const crud = new mongooseCrud(billingCollection, billingSchema, null);
const Billing = mongoose.model(init.modelNames.billing, billingSchema)
// Define API routes
router.get("/patient/:patientId", async (req, res) => {
    try {
        const { patientId } = req.params;
        const insuranceList = await Billing.find({ patientId, "_metadata.isDeleted": false })
        if (!insuranceList.length) {
            return res.status(404).json({ message: "No billing details found for this patient." });
        }
        res.status(200).json(insuranceList)
    } catch (error) {
        console.error("Error fetching billing details:", error);
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