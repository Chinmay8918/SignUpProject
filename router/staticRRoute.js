const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');

router.get("/signup",(req,res)=>
{
    return res.render("signup");
})

module.exports=router;