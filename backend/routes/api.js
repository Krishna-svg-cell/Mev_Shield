const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Trade = require('../models/Trade');

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 1. Analyze Trade Risk
router.post('/analyze', async (req, res) => {
    const { stock, quantity, action, isPrivate } = req.body;

    if (isPrivate) {
        return res.json({
            riskLevel: "SAFE",
            analysis: "Protected by Flashbots Private Relay. Invisible to public mempool.",
            slippage: 0
        });
    }

    try {
        const prompt = `
            Act as an MEV Security Bot. User is trying to ${action} ${quantity} units of ${stock}.
            Analyze the risk of Front-Running or Sandwich Attacks.
            Return ONLY raw JSON:
            {
                "riskLevel": "LOW" | "MODERATE" | "CRITICAL",
                "analysis": "Short explanation.",
                "slippage": number
            }
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(text);
        
        res.json(data);
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ riskLevel: "UNKNOWN", analysis: "AI Offline", slippage: 0 });
    }
});

// 2. Execute Trade
router.post('/trade', async (req, res) => {
    try {
        const newTrade = new Trade(req.body);
        await newTrade.save();
        res.json({ success: true, trade: newTrade });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Get History
router.get('/history', async (req, res) => {
    try {
        const trades = await Trade.find().sort({ timestamp: -1 }).limit(20);
        res.json(trades);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;