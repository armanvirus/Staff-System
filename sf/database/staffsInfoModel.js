const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

   const InfoSchema = new Schema({
        idNum:{type:String, required:true, unique:true},
        img:{type:String},
        name:{type:String, required:true},
        address:{type:String, required:true},
        phone:{type:String, required:true},
        createdOn:{ type: Date, 'default': Date.now }   
      });


   module.exports = mongoose.model("staffinfo", InfoSchema);