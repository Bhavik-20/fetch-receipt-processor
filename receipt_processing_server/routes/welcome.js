const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json({ message: "Welcome to Receipt Processing Application!" });
});

module.exports = router;