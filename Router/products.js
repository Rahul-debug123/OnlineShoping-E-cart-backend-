const express=require('express');
const db=require('./db');
const router=express.Router();
const SQL=require('sql-template-strings')

router.get('/',(req,res)=>{
    db.query(SQL`SELECT * from products`,async(err,data)=>{
        try {
            if(err) res.json({"error":"Ooops! something is wrong."});
            res.json({"error":'',products:data});
        }
        catch (e){
            res.json({"error":e});
        }
    })
})

module.exports=router;