const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Wine = require('../models/Wine.model')

//  POST /api/create-wine  -  Creates a new wine
router.post('/create-wine', (req, res) => {
    //to be extended with all wine properties
    const { name, headline, description } = req.body

    Wine.create({ name, headline, description })
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

//GET /api/random - 1 get random winde
router.get('/random-wine', (req, res) => {
    Wine.countDocuments().exec()
      .then(count => {
        const random = Math.floor(Math.random() * count)
        return Wine.findOne().skip(random).exec()
      })
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.status(500).json({ error: err.message })
      })
  })

// GET/api/search-wine - returns wines matching search parameters
  router.get("/search-wine", async (req, res) => {
    const { name, origin, pairingItems, kind } = req.query
  
    const query = {}
  
    if (name) {
      query.name = { $regex: name, $options: "i" }
    }
  
    if (origin) {
      query.origin = { $regex: origin, $options: "i" }
    }
  
    if (pairingItems) {
      query.pairingItems = { $in: pairingItems.split(",") }
    }
  
    if (kind) {
      query.kind = { $regex: kind, $options: "i" }
    }
  
    try {
      const wines = await Wine.find(query)
      res.json(wines);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error")
    }
  })

  router.get('/wine/:wineId', (req, res) => {
    const { wineId } = req.params

    if (!mongoose.Types.ObjectId.isValid(wineId)) {
        res.status(400).json({ message: "Specified id is not valid" })
        return
      }

    Wine.findById(wineId)
      .then((wine) => res.status(200).json(wine))
      .catch((error) => res.json(error));
    }) 

module.exports = router



