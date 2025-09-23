const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../data.json');


if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ appointments: [] }, null, 2));
}

function getAllAppointments() {
  const data = JSON.parse(fs.readFileSync(dataFile));
  return data.appointments;
}

function saveAppointment(appointment) {
  const data = JSON.parse(fs.readFileSync(dataFile));
  data.appointments.push(appointment);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  return appointment;
}

module.exports = {
  getAllAppointments,
  saveAppointment
};
