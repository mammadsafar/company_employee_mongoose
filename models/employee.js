const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    national_number: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        trim: true,
        default: true
    },
    manager: {
        type: Boolean,
        default: false
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    birthday: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('employee', employeeSchema);