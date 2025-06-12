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
router.post('/', async (req, res) => {
    const { country, reason, visited } = req.body; // Extract form data
    try {
        const newFormSubmission = await prisma.formSubmission.create({
            data: {
                country,
                reason,
                visited,
            },
        });
        res.status(201).json({ message: 'Form submitted successfully', data: newFormSubmission });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ error: 'Failed to save form data' });
    }
});


module.exports = router;