const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app= express()
const port=3000

let customers = [
    {
        "c_id": "01",
        "c_name":"xxxxx",
        "c_add": " xyz",
        "landmark": "kjjj",
        "phone" : "2912037468",
    },

    {
        "c_id": "02",
        "c_name":"yyyyy",
        "c_add": " zxy",
        "landmark": "pqqqq",
        "phone" : "786867689"
    }
    

];
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/customer',(req,res)=> {
    res.json(customers);
  });

app.get('/customer/:c_id',(req,res)=>{

    const c_id = req.params.c_id;

    for(let customer of customers){
        if(customer.c_id === c_id){
            res.json(customer);
            return ;
        }
    }
    res.status(404).send('customer not found');
});

app.post('/customer',(req,res) => {
    const customer = req.body;
    customers.push(customer);

    res.send('customer is added to the database');
});



app.put('/customer/:c_id' , (req,res) => {
    const c_id = req.params.c_id;
   const newcustomer = req.body;

   for(let i=0; i< customers.length; i++)
   {
       let customer = customers[i]

       if(customer.c_id === c_id)
       { customers[i] = newcustomer;}
   }

    res.send('customer is edited');
});


app.delete('/customer/:c_id' , (req,res) => {
    const c_id = req.params.c_id;

    customers = customers.filter(i => {
     if(i.c_id !== c_id) {
         return true;
     }
     return false;
 });

    res.send('customer is deleted');
});


app.listen(port, () =>
console.log(`Hello world listening on port ${port}!`));
