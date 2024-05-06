// locations.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
// GET all locations
router.get("/", async (req, res) => {
    const db = req.app.locals.db;
    try {
        const locations = await db.collection("Locations").find().toArray();
        res.json(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// POST new location
router.post("/", async (req, res) => {
    const db = req.app.locals.db;
    const newLocation = req.body;
    console.log(newLocation)
    const lastItem = await db.collection("Locations").find()
        .sort({idLocation: -1})
        .limit(1)
        .next();

    newLocation.dateFinLocation = parseInt(newLocation.dateFinLocation.split("-").join(""))
    newLocation.dateDebutLocation = parseInt(newLocation.dateDebutLocation.split("-").join(""))
    newLocation.idLocation = lastItem.idLocation + 1
    if (newLocation.avis === undefined) newLocation.avis = 0.0

    try {
        const result = await db.collection("Locations").insertOne(newLocation)
        res.status(200);
    } catch (error) {
        console.error("Error creating new location:", error);
        res.status(500).json({error: "Internal server error"});
    }

});

router.get('/:email', async (req, res) => {
    const db = req.app.locals.db;
    console.log(req.params.email)
    try {
        const email = req.params.email;

        const locations = await db.collection('Locations')
            .find({mailLoueur: email})
            .toArray();

        res.json(locations);
    } catch (error) {
        console.error('Error retrieving locations:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
