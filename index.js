const cors =  require("cors")
const express = require("express")
const stripe = require("stripe")("sk_test_51JVTm3SAuNZd9whPZ19ZJ7TavsTR4khZyxR4FhZeuhJZNjO9mlXAwjBFTvwyRbwleBujvQjOLf7QxWqdDdXubxQa00zznWQPXl")
const { v4: uuid } = require('uuid')
const bodyParser = require("body-parser");

const app = express();

//middlewear
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.get("/",(req,res)=>{
    res.send("It works at Fit.Pro");
})

app.post("/payment",(req,res)=>{
    const {product , token} = req.body;
    console.log("PRODUCT",product);
    console.log("PRICE",product.price);
    const idempotencyKey = uuid() //not to charge two times we create idempotency key

    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer=>{
        stripe.charges.create(
            {
            amount: product.price * 100,
            currency: 'usd',
            customer:customer.id,
            receipt_email: token.email,
            description:`purchase of product.name`,
            shipping:{
                name:"rahul Rosen",
                address:{
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                }
            }
        },{idempotencyKey})
    })
    .then(result=>res.status(200).json(result))
    .catch(err=>console.log(err))
})


//listen
app.listen(8282,()=> console.log("LISTENING AT PORT 8282"))