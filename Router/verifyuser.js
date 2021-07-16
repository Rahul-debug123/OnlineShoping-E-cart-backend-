const express=require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();

router.get('/',(req,res)=>{
    var token=jwt.sign({foo:'bar'},'secret')
    res.send(token);
});

module.exports=router;