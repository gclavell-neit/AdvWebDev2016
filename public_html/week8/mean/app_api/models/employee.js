var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    department: {type: String, required: true},
    startDate: {
        type: Date,
        "default": Date.now
    },
    jobTitle: {type: String, required: true},
    salary: {type: String, required: true}
});

/* This model will also create the collection in the Loc8r database when used */
var Employee = mongoose.model('Employee', employeeSchema);