const express = require('express');
const hbs = require('hbs');
const app = express();
const port =  process.env.PORT || 3001;
const fs = require('fs');
const ejs = require('ejs');
const multer = require('multer');
const upload = multer({
    dest:'public/images'
});
var datas;
fs.readFile('cityvenues.json',(err,data)=>{
    if(err){
        return console.log('Could not read file');
    } 
    datas = JSON.parse(data);
    // console.log(datas[0].city);
});
// app.set('view engine','hbs');
app.set('view engine','ejs');
app.set('views','templates/views');
hbs.registerPartials('templates/partials');
app.use(express.static('public'));
app.use(express.urlencoded());

app.get('',(req,res)=>{
    res.render('index',{
        title:'Venue Booking'
    });
});

app.get('/venues',(req,res)=>{
    const city = req.query.city;
    console.log(city);
    var num,venues;
    datas.forEach(data=>{
        if(data.city===city){
            num=data.total;
            venues=data.venues;
        }
    });
    res.render('venues',{
        title:`${city} Venues`,
        city: city,
        total:num,
        venues:venues
    });
});

app.get('/register',(req,res)=>{
    res.render('register',{
        title:'Register'
    });
});

app.post('/register', upload.single('uploadImg'), (req,res)=>{
// console.log(req.files);
res.send();
});

app.get('/login',(req,res)=>{
    res.render('login',{
        title:'Login'
    })
});

app.post('/login',(req,res)=>{
    console.log(req.body.email);
    console.log(req.body.password);
});

app.listen(port,()=>{
console.log('Server started')
});