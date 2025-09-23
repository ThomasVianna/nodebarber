const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Rotas de agendamento
router.get('/', appointmentController.listAppointments);
router.post('/', appointmentController.createAppointment);
router.delete('/:id', appointmentController.deleteAppointment); 

module.exports = router;
