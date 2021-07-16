const express=require('express');
const db=require('./db');
const router=express.Router();
const SQL=require('sql-template-strings')

router.post('/',(req,res)=>{
    const {userid}=req.body;
    db.query(SQL`SELECT * from orders where userid=${userid} `,(err,data)=>{
        if(err){
            res.json({error:err})
        }
        else {
           res.json({error:'',result:data})
        }
    })
})

module.exports=router;