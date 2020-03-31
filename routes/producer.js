const express = require('express')

const producer = express.Router()
const ObjectId = require('mongodb').ObjectID

const { MongoClient } = require('mongodb')
const pool = require('../pool.js')

const pw = require('../pw.js')

const uri = pw.mdbConnect
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

let db

client.connect(err => {
    if (err) console.log(err)
    db = client.db('candydb').collection('producers')
})


producer
    .route('/producer')
    .get((req, res) => {
        db.find().toArray((err, results) => {
            
            if (err) console.log(err)
            //Denna renderar bara fram producent nr4
            res.render('./producer.ejs', { p: results[3]})
        })
    })
    .post((req, res) => {
        
        //Split-function för att lägga in varje ord i "additional"
         console.log(req.body.additional = req.body.additional.split(' '))
      
         //Osäker på hur man ska göra en post in i "products" här...
        

        // db.insertOne(req.body, (err, result) => {
        //     console.log(req.body)
          
        //     if (err) console.log(err)
        //     console.log(`${req.body.name} added.`)
        // })
        res.redirect('/producer')
    })
.put((req, res) => {

})

    .delete((req, res) => {
        const { id } = req.body
        db.deleteOne({ _id: ObjectId(id) }, (err, result) => {
            if (err) return res.send(500, err)
            res.send({ message: 'Godis bortplockad' })
        })
    })

module.exports = producer
