const express = require('express')
const router = express.Router()

const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY
console.log(API_KEY)


router.post('/completions', async (req, res) => {

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            model : 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: req.body.message}],
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        res.send(data)

    } catch (error){
        console.error(error)
    }
})

module.exports = router
