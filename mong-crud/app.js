const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 8080
// const database = 'mongo://localhost/example'

const Fruit = require('./model')
const bodyParser = require('body-parser')

mongoose.connect(database)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// test
app.get('/', (req, res) => res.send('hello from app.get'))

// get all
app.get('/fruits', (req, res) => {
    console.log('getting everything in the fruit table.')
    Fruit.find({})
        .exec((error, result) => {
            if(error) {
                console.log('error occured.')
                res.send(error)
            } else {
                console.log('results printed on page')
                res.json(result)
            }
        })
})

// add one
app.post('/fruit', (req, res) => {
    const newFruit = new Fruit()
    newFruit.name = req.body.name
    newFruit.price = req.body.price
    newFruit.sale = req.body.sale
    newFruit.save((error, result) => {
        if(error) {
            res.send('error occured on send')
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

// get one by id
app.get('/fruits/:id', (req, res) => {
    console.log('getting one item')
    Fruit.findOne({
        _id: req.params.id
    })
    .exec((error, result) => {
        if(error) {
            res.send('error occured trying to get')
        } else {
            console.log(result)
            res.json(result)
        }
    })
})

// edit one's price by id
app.put('/fruits/:id', (req, res) => {
    console.log('editing one')
    Fruit.findOneAndUpdate({
        _id: req.params.id
    },
    {$set: {price: req.body.price}},
    {upsert: true},
        (error, result) => {
            if(error) {
                console.log('error occured trying to edit')
            } else {
                console.log(result)
                res.sendStatus(204)
            }
        }
)
})

// delete a fruit
app.delete('/fruits/:id', (req, res) => {
    Fruit.findOneAndRemove({
        _id: req.params.id
    }, (error, result) => {
        if(error) {
            res.send('error occured trying to delete')
        } else {
            console.log(result)
            res.status(204)
        }
    }
)
})

app.listen(port, () => {
    console.log('server running on port', port)
})