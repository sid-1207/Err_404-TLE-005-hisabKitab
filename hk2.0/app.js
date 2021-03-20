var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
app.set("view engine", "ejs");
var Invoice=require('./models/invoice')
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
var FuzzySearch = require('fuzzy-search');

const csv = require('csv-parser');
const fs = require('fs');



//Mongo--------------------------------------------------
mongoose.connect("mongodb://localhost:27017/HK", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));



//------------------------------------------------Routes.

app.get('/',function(req,res){
//     fs.createReadStream('data.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     row['booking_charge_amount']>=0?Invoice.create(row,function(err,entry){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(entry)
//         }
//     }):console.log("hi")
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });
    res.render('landing')
});


app.get('/home',function(req,res){
    Invoice.find({},function(err,invoices){
        if(err){
            console.log(err)
        }else{
            res.render('home',{invoices: invoices})
        }
    })  
})

// --------------------------------------------------

app.get('/add/invoice',function(req,res){
    res.render('form')
});

app.post('/add/invoice',function(req,res){
    console.log('-----------------BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
    console.log(req.body)
var pname=req.body.pname.toString();
var pnrno = req.body.pnrno.toString();
var BookingAmount=req.body.BookingAmount.toString();
var flightfrom=req.body.flightfrom.toString();
var flightdate=req.body.flightdate.toString();
var gst=req.body.gst.toString();
var saccode=req.body.saccode.toString();
var flightto=req.body.flightto.toString();
var flightno=req.body.flightno.toString();
var gstname=req.body.gstname.toString();
var taxable=req.body.taxable;
var nontaxable=req.body.nontaxable;


var characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var result = ' ';
    var charactersLength = characters.length;
    for ( let i = 0; i < 4; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
characters="0123456789";
charactersLength = characters.length;
    for ( let i = 0; i < 12; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    var charge_date=new Date().toJSON().slice(0,10).replace(/-/g,'/');





var newInv= new Invoice({
    id: " ",
  pnr: pnrno,
  is_split_pnr: " ",
  parent_pnr: " ",
  booking_type: " ",
  reservation_booking_date: " ",
  segment_booking_date: " ",
  charge_date: charge_date,
  charge_time: " ",
  first_name: pname,
  last_name: 'Shah',
  record_number: " ",
  booking_channel: " ",
  booking_agent_id: " ",
  payment_agent_id: " ",
  payment_method_code: " ",
  passenger_id: " ",
  source_org_code: " ",
  passenger_nationality_code: " ",
  email_address: " ",
  contact_number: " ",
  gst_number: gst,
  gst_holder: gstname,
  gst_email_address: " ",
  passenger_type: " ",
  pax_gst_state_code: " ",
  i5gst_state_code: " ",
  from_airport: flightfrom,
  to_airport: flightto,
  departure_time: " ",
  flight_number: flightno,
  journey_type: " ",
  class: " ",
  fare_class_service: " ",
  segment_number: " ",
  flight_status: " ",
  operating_carrier_code: " ",
  marketing_carrier_code: " ",
  departure_date: flightdate,
  all_charge_codes: saccode,
  tax_code: " ",
  charge_basis: " ",
  booking_currency: " ",
  booking_charge_amount: BookingAmount,
  local_currency: " ",
  local_charge_amount: " ",
  booking_location_code: "MAHARASTRA[27]",
  booking_promo_code: " ",
  is_inter_group_booking: " ",
  b2b_b2c: " ",
  file_no: " ",
  taxable_status: "T",
  charge_code_components: " ",
  previous_record_id: " ",
  calculated_tax: " ",
  exemption_status: " ",
  taxpayer_type: " ",
  type: " ",
  origin: " ",
  is_international: " ",
  origin_international: " ",
  is_segment_from_intl: " ",
  found_origin_international_in: " ",
  kfc_code_combine: " ",
  document_type: " ",
  created_by: " ",
  created_at: " ",
  updated_by: " ",
  updated_at: " ",
  deleted_by: " ",
  deleted_at: " ",
  is_deleted: " ",
  status: " ",
  remark: " ",
  child_pnr: " ",
  line_id: " ",
  ref_no: result,
  meal_i5gst_state_code: " ",
  pos_state_code: " ",
  charge_code: " ",
  description: " ",
  in_cn: " ",
  inv_ref_no: " ",
  original_charge_date: " ",
  original_charge_time: " ",
  is_manual_cn_upload: " ",
  group_in_invoice: " ",
  invoice_date: result,
  should_it_be_shown_on_invoice: " ",
  flight_food_master: " ",
  is_separate_invoice_cn: " ",
  actual_segment_no: " ",
  primary_id: " "
});
Invoice.create(newInv,function(err,newIn){
    if(err){
        console.log('---------------------------------')
        console.log(err)
    }else{
        console.log(newIn);
        res.redirect('/home')
    }
})

})

app.get('/invoice/:id',function(req,res){
    Invoice.findById(req.params.id,function(err,finv){
        if(err){
            console.log(err)
        }
        else{
            res.render("invoice", { inv: finv});
        }
    });
    
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

app.post('/invoice/find',function(req,res){
    console.log(req.body.search)
    if (req.body.search) {
        const regex = new RegExp(escapeRegex(req.body.search), 'gi');
        Invoice.find({ "ref_no": regex}, function (err, finv) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(finv);
                res.render('searchresult', {invoices: finv  });
            }
        });
    }
})


  //-----------------------------------------------------RUN
  app.listen(5500, function (req, res) {
    console.log("rollin");
  });

 
