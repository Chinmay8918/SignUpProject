const express=require('express');

const path=require('path');
const bcrypt=require('bcrypt');

const PORT=7000;
const app=express();


app.listen(PORT,(req,res)=>
{
    console.log(`Server Running on PORT : ${PORT}`);
})