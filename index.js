const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const route = require('./routes');
const cors = require('cors')

mongoose.connect('mongodb+srv://user:Shree2228@cluster0.kptip.mongodb.net/student?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(
   ()=>{
    const app = express();
    app.use(cors());
    app.use(bodyparser.urlencoded({extended:true}));
    app.use(express.json());
    app.use("/api",route);
    app.listen(process.env.PORT || 3000,()=>{
        console.log("server Started...");
    })
   }    
).catch(
    err =>{
        console.log(err.message);
    }
)