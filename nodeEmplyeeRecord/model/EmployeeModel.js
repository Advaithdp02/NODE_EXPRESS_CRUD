const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  E_ID: Number,
  E_NAME: String,
  E_EMAIL: String,
  E_PHONE: Number,
  E_GENDER: String,
    E_DEPT: String,
  E_LOCATION: String
});

module.exports = mongoose.model('employees', employeeSchema);