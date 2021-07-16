const express=require('express');
const db=require('./db');
const router=express.Router();
const SQL=require('sql-template-strings')

router.post('/',(req,res)=>{
    const {userid,details,time,date,delivery_address}=req.body;
    db.query(SQL`INSERT INTO orders (userid,details,time,date,delivery_address) VALUE (${userid},${details},${time},${date},${delivery_address})`,(err,data)=>{
        if(err){
            res.json({error:err})
        }
        else {
           res.json({error:''})
        }
    })
})

module.exports=router;