const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 8080

const Fruit = require('/model')
const database = 'mongo://localhost/example';
const bodyParser = require('body-parser')

mongoose.connect(database)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    console.log('hi from get')
    res.send('hi from get')
})

app.get('/fruits', (req, res) => {
    Fruit.find({})
    .exec((error, result) => {
        if(error) {
            console.log('error occured')
        } else {
            res.send(result)
        }
    })
})

app.post('/fruit', (req, res) => {
    const newFruit = new Fruit()
    newFruit.name = req.body.name
    newFruit.price = req.body.name
    newFruit.sale = req.body.sale
    newFruit.save((error, result) => {
        if(error) {
            console.log('error occured')
        } else {
            res.send(result)
        }
    })
})

app.put('/fruits/:id', (req, res) => {
    Fruit.findOneAndUpdate({
        _id: req.params.id
    }, {$set: {price: req.body.price}},
    {upsert: true},
    (error, result) => {
        if(error) {
            console.log('error occured')
        } else {
            res.send(result)
        }
    }
)
})

app.delete('/fruits/:id', (req, res) => {
    _id: req.params.id
}, (error, result) => {
    if(error) {
        console.log(error)
    } else {
        res.sendStatus(204)
    }
} 
)

app.listen(port, () => {
    console.log('listening on port', port)
})