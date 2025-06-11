const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();



router.get('/', (req, res) => {
    console.log('get request');
})

router.post('/', (req, res)=> {
    const formData = req.body;
    console.log('Received form data:', formData);
    res.status(200).json({ message: 'Form received', data: formData });
})


module.exports = router;