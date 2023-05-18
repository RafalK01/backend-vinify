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
    const {  query, kind, origin, paring } = req.query   

    if(query){
      const regex = new RegExp(query, 'i'); // 'i' flag for case-insensitive matching
      Wine.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { headline: { $regex: regex } }
        ]
      })
        .then((result) => res.status(200).json(result))
        .catch((err) => {
          res.status(500).json({ error: err.message });
      });
    } 
    if(kind){
      Wine.find({kind: kind})
      .then((result) => res.status(200).json(result))
      .catch(err => {
        res.status(500).json({ error: err.message })
      }) 
    } 
    if(origin){
      Wine.find({origin: origin})
      .then((result) =>  res.status(200).json(result))
      .catch(err => {
        res.status(500).json({ error: err.message })
      }) 
    } 
    if(paring){
      Wine.find({pairingInfo: paring})
      .then((result) => res.status(200).json(result))
      .catch(err => {
        res.status(500).json({ error: err.message })
      }) 
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



