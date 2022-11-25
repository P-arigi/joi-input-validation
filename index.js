const express = require('express');
const joi  = require('joi');

const app = express();

//middleware
app.use(express.json())

//joi validation
const schemaValidation=joi.object({
    username:joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

    password:joi.string()
    
});
;

app.post('/signup',(req,res) =>{
     const {error,value,username} = schemaValidation.validate(req.body, {abortEarly:false});
     
    //abortEarly: If username is not correct then it will not get the below one i.e., email,password
    
    if(error ){
        console.log(error)
        res.send("Invalid Request")
    }else{
        res.send("Successfully signed up!");
    }
})

app.listen(8800 ,() =>
   console.log("Backend server is running"))