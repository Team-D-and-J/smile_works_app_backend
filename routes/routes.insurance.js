const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const mongoose = require("mongoose");
const insuranceSchema = require("../schemas/schema.insurance");

const insuranceCollection = "insurance"; 
const crud = new mongooseCrud(insuranceCollection, insuranceSchema, null);
const Insurance = mongoose.model("Insurance", insuranceSchema);
// Define API routes
router.get("/", crud.find);
router.get("/:id", crud.findById);
router.get("/utils/count", crud.count);
router.post("/", crud.create);
router.put("/:id", crud.update);
router.delete("/:id", crud.deleteById);
router.delete("/utils/deleteMany", crud.deleteMany);
router.post("/utils/aggregate", crud.aggregate);
router.post("/verify", async (req, res) => {
    
    const { insuranceCompany, memberId, groupNumber } = req.body;
    if(!insuranceCompany || !memberId){
        return res.status(400).json({status: "Error", message: "Missing required fields"});
    }

    try{
        let query = { insuranceCompany, memberId };

        if(groupNumber){
            query.groupNumber = groupNumber;
        }

        const existingInsurance = await Insurance.findOne(query);

        if(existingInsurance){
            return res.json({
                status: "Verified",
                message: "Insurance is valid",
                discount: existingInsurance.discount,
            })
        } else{
            return res.json({ status: "Not Verified", message: "Invalid Insurance Details."})
        }
    } catch(error){
        return res.status(500).json({ status: "Error", message: "Server error." });
    }
})

module.exports = router;