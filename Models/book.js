const mongoose = require('mongoose');
const schema = mongoose.Schema({
    bookname :{
        type: String,
    },
    bookqty:{
        type: Number,      
    }
})
module.exports = mongoose.model("Book",schema);