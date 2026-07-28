const mongoose = require("mongoose");
const contactSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone_number:{
        type: Number,
        required: true
    },
    message:{
        type: String,
        required: true
    }
});

module.exports= mongoose.model("Contact",contactSchema);