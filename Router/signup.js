const express=require('express');
const mysql=require('mysql');
const db=require('./db');
const SQL=require('sql-template-strings');
const bcrypt=require('bcryptjs');
const Joi=require('joi');

const router=express.Router();

const schema=Joi.object({
    first_name:Joi.string()
               .alphanum()
               .min(3)
                .max(20)
                .required(),
    last_name:Joi.string()
                .alphanum()
                 .max(20)
                 .allow(null,''),
    password:Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .min(6)
                .required(),
    email: Joi.string()
            .email()
            .required(),
    Gender: Joi.string()
            .valid('M','F','O'),
    contact_number:Joi.number()
                    .integer()
                    .min(999999999)
                    .max(10**15)
                    .required()
})
router.post('/', (req,res)=>{
    var {first_name,last_name,password,email,Gender,contact_number}=req.body;
    const result=schema.validate({'first_name':first_name,
                                    'last_name':last_name,
                                    'password':password,
                                    'email':email,
                                    'Gender':Gender,
                                    'contact_number':contact_number
                                    });
    if(result.error){
        res.json({"error":result.error.details[0].message});
        console.log(result.error.details[0].message);
    }
    else {
        db.query(SQL`SELECT * FROM login where email=${email}`,async (err,result)=>{
            if(err)res.json({"error":"Ooops! something is wrong."});
            if(result.length){
                console.log("Email has already registered!");
                res.json({"error":"Email has already registered!"});
            }
            else {
                var hash= await bcrypt.hash(password,10);
                db.query(SQL`INSERT INTO login (first_name,last_name,password,email,Gender,contact_number,isAdmin) VALUES (${first_name},${last_name},${hash},${email},${Gender},${contact_number},false)`
                ,(err,result)=>{
                         if(err) res.json({"error":"Ooops! something is wrong."});
                         res.json({"error":'',"message":"Successfully registered!"});
                     });
            }
        });  
    }
    
    
                    
})
module.exports=router;