require('dotenv').config();
const express = require('express')
const app =express()
const cors = require('cors')
const { Num } = require('./functions')
const redis = require('redis')
const port = 4000

app.use(cors()) 

app.get('/api/classify-number', Num)

app.listen(port, err =>{
    if(err) console.log({msg: 'Error listen to app @ port '+ port +'.', error: err})
    console.log(`app listening at http://localhost:${port}`)
})
