const axios = require('axios');
const redis = require('redis')

const isPrime = (number) =>{
    let is_prime = false
    let divisor= []
    let prime = 0
    let strNum = number.toString()    
    
    for(let i = 0; i < number; i++){
        
        if(number % i === 0 && i != 1){ 
            prime++
        }

        if(number%i === 0 && i !== number){
            divisor.push(i);
        }
    }

    if(prime == 0){
        is_prime = true
    }
    return result = {is_prime, divisor}
}

const isPerfect = (number, divisor) =>{
    let sumDivisor = 0;
    let is_perfect = false;
    if(divisor){
        for(let y = 0; y < divisor.length; y++){
                sumDivisor += divisor[y]
            }
        if (sumDivisor === number){
            is_perfect = true;
        }
    }
    return result = {is_perfect}
}  

const armstrongDigitSum = (number) =>{
    let terminateProp = false;
    let digit_sum = 0
    let strNum = number.toString()
    
    let properties = []
    let isArmstrong = 0

    while (terminateProp == false){
        let numSum = 0
        let numCount = 0
        
        for(let x = 0; x < strNum.length; x++){
            numSum +=parseInt(strNum[x]);
            numCount++
        }        
        
        if(numCount > 1){
            for(let w = 0; w < numCount; w++){
                isArmstrong += parseInt(strNum[w])**numCount;
            }
        } 
    
        if(isArmstrong == number){
            properties.push('armstrong');
        }
    
        if(number%2 === 0){
            properties.push('even')
        }else{
            properties.push('old')
        }
        digit_sum = numSum
        terminateProp = true;
    }
    return result = {digit_sum, properties}
}

const number_Api=async (number)=>{
    const fun_fact = await axios.get(`http://numbersapi.com/${number}/math`)
    return fun_fact.data
}

const Num =async (req, res) =>{
    try {
        const number = Number(req.query.number)
        console.log(number)

        if(isNaN(number) == true){
            return res.status(400).json({
                "number": `${req.query.number}`,
                "error": true
            })
        }

        const result_isPrime = isPrime(number)
        const is_prime = result_isPrime.is_prime
        const divisor = result_isPrime.divisor;
        
        const result_isPerfect = isPerfect(number, divisor)
        const is_perfect = result_isPerfect.is_perfect;
    
        const result_armstrong = armstrongDigitSum(number)
        const digit_sum = result_armstrong.digit_sum;
        const properties = result_armstrong.properties
        let fun_fact
        try {
            fun_fact = await number_Api(number) 
        } catch (error) {
            console.log(error.message)
        }

        try {
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

            await client.hSet(`${number}`, {
                number: `${number}`,
                is_prime: `${is_prime}`,
                is_perfect: `${is_perfect}`,
                properties: `[${properties}]`,
                digit_sum: `${digit_sum}`,
                fun_fact: `${fun_fact}`
            })
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({
            number,
            is_prime,
            is_perfect,
            properties,
            digit_sum,
            fun_fact
        })
    } catch (error) {
       console.log(error);
       if(error.name == 'ReferenceError'){
            return res.status(400).json({
                "number": "alphabet",
                "error": true
            })
       }else{
            return res.status(400).json({
                "number":"parameters",
                "error":"expected number got symbols"
            })
       }
    }
}

module.exports = {
    Num
}



