//database user name: admin-aryan, pass: P9g6HGgFaQDG541R
const express = require("express");
const app = express();
const mongoose= require("mongoose");
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require("./config/keys");


mongoose.connect(MONGOURI,{ useUnifiedTopology: true ,useNewUrlParser: true});
mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo");
});
mongoose.connection.on("error",(err)=>{
    console.log("Error connecting " +err);
});



require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));


if(process.env.NODE_ENV== "production"){
    
    const path=require("path")
    app.get("/",(req,res)=>{
        app.use(express.static(path.resolve(__dirname,"client","build")))
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

app.listen(PORT,function(){
    console.log("Server is runnig on " + PORT);
});