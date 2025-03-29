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
})

router.get("/utils/appointments-by-day", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const startOfDay = moment(date).startOf("day").toDate();
    const endOfDay = moment(date).endOf("day").toDate();

    const appointments = await appointmentModel.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    return res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments by day:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/utils/appointments-count-by-week", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const startOfWeek = moment(date).startOf("week").toDate();
    const endOfWeek = moment(date).endOf("week").toDate();

    const appointments = await appointmentModel.aggregate([
      {
        $match: {
          date: { $gte: startOfWeek, $lte: endOfWeek },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$date" }, // Groups by day of the week (1 = Sunday, 7 = Saturday)
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sorts from Sunday (1) to Saturday (7)
      },
    ]);

    // Map the result to readable day names
    const daysMap = {
      1: "Sunday",
      2: "Monday",
      3: "Tuesday",
      4: "Wednesday",
      5: "Thursday",
      6: "Friday",
      7: "Saturday",
    };
    console.log("query" + req.query)
    const formattedResult = appointments.map((item) => ({
      day: daysMap[item._id],
      count: item.count,
    }));
console.log("query" + req.query)
    return res.json(formattedResult);
  } catch (err) {
    console.error("Error fetching weekly appointment count:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/utils/appointments-count-today", async (req, res) => {
  try {
    const today = moment().startOf("day").toDate(); // Beginning of today
    const endOfDay = moment().endOf("day").toDate(); // End of today

    const appointments = await appointmentModel.find({
      date: { $gte: today, $lte: endOfDay }, // Filter today's appointments
    });
    return res.json(appointments);
  } catch (err) {
    console.error("Error fetching today's appointment count:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/utils/upcoming", async (req, res) => {
  try {
    const now = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();

    // Fetch upcoming appointments
    const appointments = await appointmentModel.find({
      date: { $gte: now, $lte: endOfDay },
      "status": { $ne: "Cancelled" }
    }).sort({ date: 1 });

    if (!appointments.length) return res.json([]);

    // Get unique doctor and patient IDs
    const doctorIds = [...new Set(appointments.map(a => a.doctorId))];
    const patientIds = [...new Set(appointments.map(a => a.patientId))];

    // Fetch doctor and patient names
    const User = mongoose.model("User");
    const Patient = mongoose.model("Patient");

    const doctors = await User.find({ _id: { $in: doctorIds } }).select("name _id");
    const patients = await Patient.find({ _id: { $in: patientIds } }).select("name _id");

    const doctorMap = Object.fromEntries(doctors.map(d => [d._id, d.name]));
    const patientMap = Object.fromEntries(patients.map(p => [p._id, p.name]));

    // Attach names to appointments
    const enrichedAppointments = appointments.map(a => ({
      ...a._doc,
      doctorName: doctorMap[a.doctorId] || "Unknown Doctor",
      patientName: patientMap[a.patientId] || "Unknown Patient",
    }));

    res.json(enrichedAppointments);
  } catch (err) {
    console.error("Error fetching upcoming appointments:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
