const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../data.json');

// Cria data.json se não existir
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ appointments: [] }, null, 2));
}

function listAppointments(req, res) {
  const data = JSON.parse(fs.readFileSync(dataFile));
  res.json(data.appointments);
}

function createAppointment(req, res) {
  const data = JSON.parse(fs.readFileSync(dataFile));
  const newAppointment = req.body;

  const maxId = data.appointments.length > 0
    ? Math.max(...data.appointments.map(app => Number(app.id) || 0))
    : 0;
  newAppointment.id = (maxId + 1).toString();

  data.appointments.push(newAppointment);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  res.status(201).json({ message: 'Agendamento criado', appointment: newAppointment });
}

function deleteAppointment(req, res) {
  const data = JSON.parse(fs.readFileSync(dataFile));
  const appointmentId = req.params.id;

  const initialLength = data.appointments.length;
  data.appointments = data.appointments.filter(app => app.id !== appointmentId);

  if (data.appointments.length < initialLength) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.json({ message: 'Agendamento deletado com sucesso' });
  } else {
    res.status(404).json({ message: 'Agendamento não encontrado' });
  }
}

module.exports = {
  listAppointments,
  createAppointment,
  deleteAppointment
};
