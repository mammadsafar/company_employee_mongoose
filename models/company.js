const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    id_register: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    province: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    date_registered: {
        type: Date,
        default: Date.now
    },
    phone_number: {
        type: String,
        default: "09000000000",
        length: 11
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: "employee",
        default: "60464db58827fc4dc47b464b",
    }


});

module.exports = mongoose.model('Company', CompanySchema);