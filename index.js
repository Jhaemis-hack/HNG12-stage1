require('dotenv').config();
const express = require('express')
const app =express()
const cors = require('cors')
const { Num } = require('./functions')
const redis = require('redis')
const port = 4000

app.use(cors()) 

app.use(async (req, res, next) => {
    const number = Number(req.query.number)

    if(isNaN(number) == true ||
        Number.isInteger(number) == false||
        Math.sign(number) == -1){
        return res.status(400).json({
            "number": `${req.query.number}`,
            "error": true
        })
    }

    const client = redis.createClient({
        username: process.env.username,
        password: process.env.password,
        socket: {
            host: process.env.host,
            port: process.env.port
        }
    });
            
    client.on('error', err => console.log('Redis Client Error', err)); 

    await client.connect();

    let userSession = await client.hGetAll(`${number}`);
    
    if (Object.keys(userSession).length !== 0) {
        return res.json(userSession)
    }else{
        next()
    }
})


app.get('/api/classify-number', Num)

app.listen(port, err =>{
    if(err) console.log({msg: 'Error listen to app @ port '+ port +'.', error: err})
    console.log(`app listening at http://localhost:${port}`)
})
