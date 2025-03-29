const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const mongoose = require("mongoose");
const moment = require("moment");

const Patient = require("../schemas/schema.patient");
const User = require("../schemas/schema.user");
const Appointment = require("../schemas/schema.appointment");

const appointmentCollection = "appointment";
const crud = new mongooseCrud(appointmentCollection, Appointment, null);
const appointment = mongoose.model("Appointment", Appointment);

const patient = mongoose.model("Patient", Patient);
const user = mongoose.model("User", User);

// API to fetch schedule with optional view filters (day/week)
router.get("/", async (req, res) => {
  try {
    let view, date, start;
    if (req.query.filter) {
      const parsed = JSON.parse(req.query.filter);
      view = parsed.view;
      date = parsed.date;
      start = parsed.start;
    } else {
      view = req.query.view;
      date = req.query.date;
      start = req.query.start;
    }

    console.log("Fetching schedule view:", view);

    let filter = {};
    let startDate, endDate;

    if (view === "day" && date) {
      startDate = moment(date).startOf("day").toDate();
      endDate = moment(date).endOf("day").toDate();
      filter.date = { $gte: startDate, $lte: endDate };
    } else if (view === "week" && start) {
      startDate = moment(start).startOf("day").toDate();
      endDate = moment(start).add(6, "days").endOf("day").toDate();
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const appointments = await appointment.find(filter).sort({ date: 1 });

    if (!appointments.length) {
  return res.json({});
}

    const enriched = await Promise.all(
      appointments.map(async (appt) => {
        const patient_rec = await patient.findById(appt.patientId).select("name");
        const doctor_rec = appt.doctorId
          ? await user.findById(appt.doctorId).select("name roles")
          : null;

        return {
          _id: appt._id,
          date: appt.date,
          time: moment(appt.date).format("hh:mm A"),
          patientName: patient_rec?.name || "Unknown Patient",
          doctorName: doctor_rec?.roles?.isDoctor ? doctor_rec.name : "Unknown Doctor",
          treatmentMaster: appt.treatmentMaster || "No treatment info",
          status: appt.status,
        };
      })
    );

    const grouped = enriched.reduce((acc, curr) => {
      const dateKey = moment(curr.date).format("YYYY-MM-DD");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(curr);
      return acc;
    }, {});

    return res.json(grouped);
  } catch (error) {
    console.error("Schedule fetch error:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});



// Standard CRUD endpoints
router.get("/:id", crud.findById);
router.get("/utils/count", crud.count);
router.post("/", crud.create);
router.put("/:id", crud.update);
router.delete("/:id", crud.deleteById);
router.delete("/utils/deleteMany", crud.deleteMany);
router.post("/utils/aggregate", crud.aggregate);

module.exports = router;
