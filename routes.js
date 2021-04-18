const express = require('express');
const Book = require('./Models/book');
const User = require('./Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();


router.post("/registration",async (req,res)=>{
    

    const salt = await bcrypt.genSaltSync(10)
    const hashedpass = await bcrypt.hashSync(req.body.pswd , salt) 
    const user = new User({
        uname : req.body.uname,
        pswd: hashedpass,      
    })
    await user.save();
    res.send(user);
})

router.post("/login",async (req,res)=>{
    
    const user = await User.findOne({uname: req.body.uname})
    if(!user){
        return res.send("User not exists")
    }else{
        const isValid = await bcrypt.compare(req.body.pswd,user.pswd)
        if(!isValid){
            res.send("Password is invalid")
        }else{
            const token = jwt.sign({_id:user._id},"privatekey");
            res.send({token});
            res.send("login successfully")
        }
    }

})

router.get("/books",async (req,res)=>{
    const book = await Book.find();
    res.send(book);
});

router.post("/books",async (req,res)=>{
   try{
        const book = new Book({
            bookname:req.body.bookname,
            bookqty:req.body.bookqty
       });
       await book.save();
       res.send(book);
    }catch(error){
            res.status(404).send(error.message)
    }
    
    
});

router.patch("/books/:id",async (req,res)=>{
    var id = req.params.id;
    await Book.findOneAndUpdate({_id:id},{$set:{bookname:req.body.bookname,bookqty:req.body.bookqty}});
    
})

router.delete("/books/:id",async (req,res)=>{
    var id = req.params.id;
    await Book.findByIdAndDelete({_id:id})
    res.send("Data Deleted....")
})

module.exports = router;