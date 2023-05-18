const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")



const User = require('../models/User.model')

//Get all the user info
router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    
    User.findById(id)
    .populate("wineList")
    .then((response) => {
        res.json(response);
      })
    
})


router.post('/user/:id', async (req, res) => {
    const { id } = req.params;
    const likedWine = req.body.likedWine;
    const newName = req?.body?.newData?.newName;
    const newEmail = req?.body?.newData?.newEmail;
  
    try {

      if(newName){
        console.log(newName)
        User.findByIdAndUpdate(
          id,
          { name: newName},
          { new: true }
        )
          .then((response) => {
            console.log(response)
            res.json(response);
          })
        }
        if(newEmail){
          console.log(newEmail)
          User.findByIdAndUpdate(
            id,
            { email: newEmail},
            { new: true }
          )
            .then((response) => {
              console.log(response)
              res.json(response);
            })
          }

      if(likedWine){
      const user = await User.findById(id);
      if (!user.wineList.includes(likedWine)) {
        User.findByIdAndUpdate(
          id,
          { $push: { wineList: likedWine } },
          { new: true }
        )
          .then((response) => {
            res.json(response);
          })
      } else {
        User.findByIdAndUpdate(
          id,
          { $pull: { wineList: likedWine } },
          { new: true }
        )
          .then((response) => {
            res.json(response);
          })
      }
    } 
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

  })




module.exports = router

