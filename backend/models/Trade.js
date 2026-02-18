const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
    stock: String,
    action: String,
    quantity: Number,
    value: Number,
    isPrivate: Boolean,
    riskLevel: String, // SAFE, MODERATE, CRITICAL
    aiAnalysis: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', TradeSchema);