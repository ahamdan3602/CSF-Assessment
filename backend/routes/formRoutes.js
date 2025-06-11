const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




router.get('/', async (req, res) => {
    try {
        const forms = await prisma.formSubission.findMany();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch forms'});
    }
})

router.post('/', (req, res)=> {
    const formData = req.body;
    console.log('Received form data:', formData);
    res.status(200).json({ message: 'Form received', data: formData });
})


module.exports = router;