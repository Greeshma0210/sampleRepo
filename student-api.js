const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app= express()
const port=3000

let students = [
    {
        "Student_id": "01",
        "Student_name":"xxxxx",
        "Stydent_grade":"A",
        "Course": "CSE",
        "phone" : "2912037468",
    },

    {
        "Student_id": "02",
        "Student_name":"yyyyy",
        "Stydent_grade":"B",
        "Course": "CSE",
        "phone" : "2912685468",
    },
    {
        
        "Student_id": "03",
        "Student_name":"yyyyyy",
        "Stydent_grade":"C",
        "Course": "CSE",
        "phone" : "29086468",
    }
    

];
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/student',(req,res)=> {
    res.json(students);
  });

app.get('/student/:Student_id',(req,res)=>{

    const Student_id = req.params.Student_id;

    for(let student of students){
        if(student.Student_id === Student_id){
            res.json(student);
            return ;
        }
    }
    res.status(404).send('Student not found');
});

app.post('/student',(req,res) => {
    const student = req.body;
    students.push(student);

    res.send('student is added to the database');
});



app.put('/student/:Student_id' , (req,res) => {
    const Student_id = req.params.Student_id;
   const newStudent = req.body;

   for(let i=0; i< students.length; i++)
   {
       let student = students[i]

       if(student.Student_id === Student_id)
       { students[i] = newStudent;}
   }

    res.send('student is edited');
});


app.delete('/student/:Student_id' , (req,res) => {
    const Student_id = req.params.Student_id;

    students = students.filter(i => {
     if(i.Student_id !== Student_id) {
         return true;
     }
     return false;
 });

    res.send('Student is deleted');
});


app.listen(port, () =>
console.log(`Hello world listening on port ${port}!`));
