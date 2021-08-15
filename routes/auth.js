const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const{JWT_SECRET} = require("../keys");
const requireLogin = require("../middlewares/requireLogin");


router.get("/",(req,res)=>{
    res.send("hello");
});


router.post("/signup",(req,res)=>{
   const{name,email,password,pic}= req.body;
   if(!name || !email || !password){
      return res.status(422).json({error:"Please fill all the fields"});
   }
   User.findOne({email : email})
   .then(savedUser =>{
       if(savedUser)
       {
        return res.status(422).json({error:"User already exists"});
       } else {
           bcrypt.hash(password,12)
           .then(hashedPassword => {
            const user = new User({
                email,
                password:hashedPassword,
                name,
                pic
            })
            user.save()
            .then(user=>{
                res.json({message: "Saved Successfully"});
            })
            .catch(err => {
                console.log(err);
            });
           })
           
       }


   })
   .catch(err => {
       console.log(err);
   });
});

router.post("/signin",(req,res)=>{
    const{email,password}= req.body;
    if(!email || !password){
        res.status(422).json({message:"Please fill all the fields."});
    } else {
        User.findOne({email:email})
        .then((savedUser)=>{
            if(!savedUser){
               return res.status(422).json({message:"Invalid Email or Password."});
            } else{
                bcrypt.compare(password,savedUser.password)
                .then(doMatch =>{
                    if(doMatch){
                        const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                        const{_id,name,email,followers,following,pic}=savedUser;
                        res.json({token,user:{_id,name,email,followers,following,pic}});
                    } else {
                        return res.status(422).json({message:"Invalid Email or Password."});
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })
    }
})

module.exports = router;