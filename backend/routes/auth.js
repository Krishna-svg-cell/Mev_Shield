const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Setup PIN (Dev tool to create the admin user)
router.post('/setup', async (req, res) => {
    const { pin } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pin, salt);
        
        // Check if exists, update or create
        let user = await User.findOne({ username: 'admin' });
        if (user) {
            user.pinHash = hash;
            await user.save();
        } else {
            user = new User({ username: 'admin', pinHash: hash });
            await user.save();
        }
        res.json({ msg: "PIN Configured Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { pin } = req.body;
    try {
        const user = await User.findOne({ username: 'admin' });
        
        // Fallback for first run if no user exists yet
        if (!user) {
            if (pin === "1234") return res.json({ success: true, msg: "Dev Mode" });
            return res.status(400).json({ success: false, msg: "System not initialized" });
        }

        const isMatch = await bcrypt.compare(pin, user.pinHash);
        if (!isMatch) return res.status(401).json({ success: false, msg: "Invalid PIN" });
        
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;