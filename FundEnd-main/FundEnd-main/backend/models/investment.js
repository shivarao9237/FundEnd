const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startups: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        amountInvested: {
            type: Number,
            required: true,
            min: 0
        },
        progress: {
            type: String,
            default: "In Progress",
            enum: ["In Progress", "Completed", "Failed"]
        }
    }],
    localBusinesses: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        amountInvested: {
            type: Number,
            required: true,
            min: 0
        },
        progress: {
            type: String,
            default: "In Progress",
            enum: ["In Progress", "Completed", "Failed"]
        }
    }],
    totalCompanies: {
        type: Number,
        default: function () {
            return this.startups.length + this.localBusinesses.length;
        }
    },
    totalAmountInvested: {
        type: Number,
        default: function () {
            return this.startups.reduce((sum, startup) => sum + startup.amountInvested, 0) +
                   this.localBusinesses.reduce((sum, business) => sum + business.amountInvested, 0);
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Investment', investmentSchema);
