const router = require("express").Router();
const mongooseCrud = require("mongoose-express-middleware");
const mongoose = require("mongoose");

const Patient = require("../schemas/schema.patient");
const User = require("../schemas/schema.user");
const Appointment = require("../schemas/schema.appointment");

const appointmentCollection = "appointment";
const crud = new mongooseCrud(appointmentCollection, Appointment, null); 
const appointment = mongoose.model("Appointment", Appointment);

const patientCollection = "patient";
const patient = mongoose.model("Patient", Patient);

const userCollection = "user";
const user = mongoose.model("User", User);

// API to fetch appointments in ascending order of date


router.get("/", async (req, res) => {
  try {
      console.log("Fetching appointments in ascending order...");

      // Fetch appointments sorted by date
      const appointments = await appointment.find().sort({ date: 1 });

      if (!appointments || appointments.length === 0) {
          return res.status(404).json({ message: "No appointments found" });
      }

      // Enrich appointments with doctor and patient names
      const appointmentsWithDetails = await Promise.all(
          appointments.map(async (appointment) => {
              const patient_rec = await patient.findById(appointment.patientId).select("name");
              let doctorName = "Unknown Doctor";
              
            
              if (appointment.doctorId) {
                const doctor_rec = await user.findById(appointment.doctorId).select("name roles");
                if (doctor_rec && doctor_rec.roles.isDoctor) {
                  doctorName = doctor_rec.name;
                }
              }

              return {
                  //_id: appointment._id,
                  date: appointment.date 
                ? new Date(appointment.date).toISOString().replace("T", " ").substring(0, 16) 
                : "Invalid Date",
                  patientName: patient_rec ? patient_rec.name : "Unknown Patient",
                  doctorName: doctorName,
                  treatmentMaster: appointment.treatmentMaster || "No treatment information",
                  status: appointment.status,
              };
          })
      );

      return res.json(appointmentsWithDetails);
  } catch (error) {
      console.error("Error fetching appointments:", error);
      return res.status(500).json({ message: "Error retrieving appointments", error: error.message });
  }
});
router.get("/:id", crud.findById);
router.get("/utils/count", crud.count);
router.post("/", crud.create);
router.put("/:id", crud.update);
router.delete("/:id", crud.deleteById);
router.delete("/utils/deleteMany", crud.deleteMany);
router.post("/utils/aggregate", crud.aggregate);

module.exports = router;
