const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app= express()
const port=3000

let products = [
    {
        "product_id": "01",
        "product_name":"complan",
        "product_manu": " nestle",
        "manu_date": "2014-7-17",
        "exp_date" : "2016-7-17",
    },

    {
        "product_id": "02",
        "product_name":"horlicks",
        "product_manu": " nestle",
        "manu_date": "2014-8-27",
        "exp_date" : "2016-8-27",
    }
    

];
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/product',(req,res)=> {
    res.json(products);
  });

app.get('/product/:product_id',(req,res)=>{

    const product_id = req.params.product_id;

    for(let product of products){
        if(product.product_id === product_id){
            res.json(product);
            return ;
        }
    }
    res.status(404).send('product not found');
});

app.post('/product',(req,res) => {
    const product = req.body;
    products.push(product);

    res.send('product is added to the database');
});



app.put('/product/:product_id' , (req,res) => {
    const product_id = req.params.product_id;
   const newproduct = req.body;

   for(let i=0; i< products.length; i++)
   {
       let product = products[i]

       if(product.product_id === product_id)
       { products[i] = newproduct;}
   }

    res.send('product is edited');
});


app.delete('/product/:product_id' , (req,res) => {
    const product_id = req.params.product_id;

    products = products.filter(i => {
     if(i.product_id !== product_id) {
         return true;
     }
     return false;
 });

    res.send('product is deleted');
});


  app.listen(port, () =>
console.log(`Hello world listening on port ${port}!`
));
