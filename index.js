const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs= require('fs');
const fileUpload = require('express-fileupload');
var mysql = require('mysql');

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

var dbConnect = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'practice'
})
dbConnect.connect();
app.post('/add', (req, res) => {
    const country = req.body.cName;
    const capital = req.body.capName;
    dbConnect.query('insert into favouritecity (country,capital) values(?,?)',[country,capital], function (error,result){
        return res.send({messege:'hellow'});
    })

})
app.get('/show', (req, res) => {
    dbConnect.query('select * from favouritecity',function (error,result){
        return res.send({result})
    })
})

app.delete('/deletedata', (req, res) => {
    const id = req.body.id
    dbConnect.query('delete from favouritecity where id=?',id,function (error,result){
        res.send({message:"mara kha"})
    })
})

app.get('/singlecountry/:id',(req,res) => {
    const id = req.params.id;
    console.log(id)
    dbConnect.query('select * from favouritecity where id=?',id,function (error,result){
        res.send({data:result[0]})
    })
})

app.put('/updatedata',(req, res)=>{
    const id = req.body.id;
    const country = req.body.country;
    const capital = req.body.capital;
    dbConnect.query('update favouritecity set country=?,capital=? where id=?',[country,capital,id], (error,result) => {
        res.send({message:"succerss"})
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})