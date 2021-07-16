const express=require('express');
const bcrypt=require('bcryptjs');
const SQL=require('sql-template-strings');
const db=require('./db');
const router=express.Router();
const jwt=require('jsonwebtoken');

router.post('/',(req,res)=>{
    const {email,password}=req.body;
    db.query(SQL`SELECT id,first_name,email,password,isAdmin FROM login where email=${email}`,async (err,data)=>{

        try {
            if(err) res.json({"error":"Ooops! something is wrong."});
        if(data.length) {
            const hash=data[0].password;
            const match=await bcrypt.compare(password,hash);
            delete data[0].password;
            
            
            if(match){
                const token = jwt.sign(JSON.stringify(data[0]), 'secret');
                res.json({"error":'',"user":token});
            }
            else {
                res.json({"error":"password don't match"});
            }
        }
        else {
            res.json({"error":"User with current email does not exist.","user":''});
        }}
        catch (e){
            res.json({"error":e});
        }
    })

})

module.exports=router;