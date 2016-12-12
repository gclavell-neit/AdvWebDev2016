var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    jobTitle: String,
    salary: String,
    startDate: String
});


var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;