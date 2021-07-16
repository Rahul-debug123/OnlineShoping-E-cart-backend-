const express=require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();


router.post('/',(req,res)=>{
    jwt.verify(req.body.token,'secret',function(err,decoded){
        if(err){
            res.json({'error':err,'access':false});
        }
        else {
            res.json({'error':decoded.user,'access':true,"info":decoded});
        }
    });
    //res.send(payload);
})

module.exports=router;