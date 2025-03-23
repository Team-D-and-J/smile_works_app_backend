const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const mongoose = require("mongoose");
const appointmentSchema = require("../schemas/schema.appointment");
const init = require("../init");
const moment = require("moment");

const appointmentCollection = init.modelNames.appointment;
const crud = new mongooseCrud(appointmentCollection, appointmentSchema, null);
const appointmentModel = mongoose.model(init.modelNames.appointment, appointmentSchema);
// Define API routes
router.get("/", crud.find);
router.get("/:id", crud.findById);
router.get("/utils/count", crud.count);
router.put("/:id", crud.update);
router.delete("/:id", crud.deleteById);
router.delete("/utils/deleteMany", crud.deleteMany);
router.post("/utils/aggregate", crud.aggregate);

router.post("/", async (req, res) => {
  const { date } = req.body;

  const existing = await appointmentModel.findOne({ date });

  if (existing) {
    return res.status(400).json({ message: "That time slot is already booked." });
  }

  try {
    const appointment = new appointmentModel(req.body);
    await appointment.save();
    return res.status(201).json(appointment);
  } catch (err) {
    console.error("Booking failed:", err);
    return res.status(500).json({ message: "Server error while booking." });
  }
});


router.get("/utils/available-times", async (req, res) => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const { date } = filter;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const startOfDay = moment(date).startOf("day").toDate();
    const endOfDay = moment(date).endOf("day").toDate();

    const appointments = await appointmentModel.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const takenTimes = appointments.map((a) => moment(a.date).format("hh:mm A"));

    const allTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
    const available = allTimes.filter((t) => !takenTimes.includes(t));

    return res.json({ available });
  } catch (err) {
    console.error("Error checking availability:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
