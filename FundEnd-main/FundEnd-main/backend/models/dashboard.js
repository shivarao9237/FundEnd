const userDashboardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    crowdfundingCards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('UserDashboard', userDashboardSchema);
