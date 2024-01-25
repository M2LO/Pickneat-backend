const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({

    fullName: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    address: {
        type: String,
        require: true
    },

    city: {
        type: String,
        require: true
    },

    state: {
        type: String,
        require: true
    },

    zipCode: {
        type: String,
        require: true
    }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;