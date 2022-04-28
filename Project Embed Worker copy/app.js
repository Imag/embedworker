const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = process.env.ENV_PORT || 3000

const Embed = require('./models/embed')

app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'static')))

mongoose.connect('mongodb+srv://Techy:r4KiOjZAE48EGDwz@techydev.wdu1c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connection to MONGODB Database Estabilished')
})

app.post('/uploader/worker/v1', async (req,res) => {
    const {emid, title, description, image, hex_colour} = req.body
    try{
        const response = await Embed.create({
            emid,
            title,
            description,
            image,
            hex_colour,
        })
        console.log('user created successfully', response)
    } catch (error) {
        console.log(error)
       return res.send({error: true, message: 'Error'})
    }
    res.json({status: 'ok'})
})

app.get('/builder/:id', async (req,res) => {
    const {id} = req.params

    const embed = await Embed.findOne({emid: id}).lean()

    if(!embed) {
        return res.json({status: 'error', error: 'No Embed Data Found'})
    } else if(embed) {
      return res.json({status: 'ok', title: embed.title, description: embed.description, hex_colour: embed.hex_colour, image: embed.image})
    }

})

app.listen(PORT, () => {
    console.log(`App is live at Port: ${PORT}`)
})