const express=require('express');
const collection=require('./models/uurl');
 const staticroute=require('./router/staticRoute');
 const staticRoute=require('./router/staticRRoute');

const path=require('path');
const bcrypt=require('bcrypt');

const PORT=7000;
const app=express();

//middlewere
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use("/",staticroute);
app.use("/",staticRoute);

app.get("/check",async(req,res)=>
{
    const alldata=await collection.find({});
    return res.send(alldata);
})

// 
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    try {
        const existingUser = await collection.findOne({name: data.name});
        if (existingUser) {
            return res.status(400).send("User already exists. Please choose a different username");
        }
        else
        {
            //hash the password using bcrcypt
            const saltRound=10;//number of slots for bcrypt

            const hashedPassword= await bcrypt.hash(data.password, saltRound);

            //replasing the hash  password with original password
            data.password=hashedPassword;
            const userData = await collection.insertMany(data);
            console.log(userData);
        }
      
        res.send("User signed up successfully");
    } catch (error) {
        console.error("Error occurred during signup:", error);
        res.status(500).send("Internal Server Error ");
    }
});


app.post("/login",async(req,res)=>
{
    try{
        const check=await collection.findOne({name: req.body.username});
        if(!check)
            {
                res.send("user name cannot found");

            }

        //compareing the hash password from database with the palin text
        const   isPasswordMach=await  bcrypt.compare(req.body.password,check.password);
        if(isPasswordMach)
            {
                res.render("home")
            }
            else
            {
                res.send("WRONG PASSWORD");
            }

    }
    catch{
             res.send(" Wrong Details");
    }
})


// Importing required modules
const mongoose = require('mongoose');
const { error } = require('console');
const { name } = require('ejs');

const connect=mongoose.connect("mongodb://localhost:27017/Login");
connect.then(()=>
{
       console.log("Data Base connect");
})
.catch(()=>
{
    console.log("data base not connect");
})


app.listen(PORT,(req,res)=>
{
    console.log(`Server Running on PORT : ${PORT}`);
})
