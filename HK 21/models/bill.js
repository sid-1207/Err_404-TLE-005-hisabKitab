var mongoose =require('mongoose');
const Invoice = require('./invoice')
const Schema=mongoose.Schema;
var billschema=new mongoose.Schema({
    ref_no:{
        type:String
    },
    invoices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Invoice'
        }
    ]
    
});
module.exports= mongoose.model("Bill",billschema);