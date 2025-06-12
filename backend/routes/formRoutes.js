const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




// GET route to fetch all form submissions
router.get('/', async (req, res) => {
    try {
        const forms = await prisma.formSubmission.findMany();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch forms'});
    }
})

// GET route to fetch a specific form submission by ID
router.get(`/:id`, async (req, res) => {
    const { id } = req.params;
    try {
        const form = await prisma.formSubmission.findUnique({
            where: { id: parseInt(id) }
        });
        if (form) {
            res.status(200).json(form);
        } else {
            res.status(404).json({ error: 'Form not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch form' });
    }
})

// POST route to handle form submission
router.post('/', (req, res)=> {
    const formData = req.body;
    console.log('Received form data:', formData);
    res.status(200).json({ message: 'Form received', data: formData });
})


module.exports = router;