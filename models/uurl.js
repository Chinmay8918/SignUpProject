const mongoose=require('mongoose');

const bcrypt=require('bcrypt');

const LoginSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            unique:true
        }
    }
)

const collection=new mongoose.model("users",LoginSchema);
module.exports=collection;