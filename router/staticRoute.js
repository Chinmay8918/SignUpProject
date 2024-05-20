const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');

router.get("/login",(req,res)=>
{
    return res.render("login");
})

module.exports=router;