const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let books = [{
    "isbn":"8786365329008",
    "title":"Eloquent javascript , second Edition",
    "author": "Marijin Haverbeke",
    "publisher":"No starch press",
    "numOfPages":472, 
},
{
    "isbn":"8786365329007",
    "title":"javascript , second Edition",
    "author": "Mastani",
    "publisher":"No starch press",
    "numOfPages":472, 
},
{
    "isbn":"8786365329006",
    "title":"Advanced javascript , second Edition",
    "author": "Bajiro",
    "publisher":"No starch press",
    "numOfPages":472, 
}
]
app.use(cors());

app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());
app.post('/book',(req,res)=>{
    const book=req.body;
    console.log(book);
    books.push(book);
    res.send('book is added to db');
});

app.put('/book/:isbn',(req,res)=>{
    const isbn=req.params.isbn;
    const newbook=req.body;
    for(let i=0;i<books.length;i++){
        let book = books[i];
        if(book.isbn===isbn){
        books[i]=newbook;
    }
}
res.send('book is edited');
});

app.delete('/book/:isbn',(req,res)=>{
    const isbn = req.params.isbn;
    books=books.filter(i=>{
        if(i.isbn!==isbn){
            return true;
        }
        return false;
    });
    res.send('book is deleted');
});

app.get('/book', (req, res) =>{
    res.json(books);
});
app.get('/book/:isbn',(req,res)=> {
    const isbn = req.params.isbn;
    for(let book of books ) {
        if(book.isbn == isbn) {
            res.json(book);
            return;
        }
    }
    res.status(404).send('Book not found');
});

app.listen(port,() =>
console.log(`Hello world listening on port ${port}!`)
);