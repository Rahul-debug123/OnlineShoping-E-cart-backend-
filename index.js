const express=require('express');
const bodyParser= require('body-parser');
const Verifyuser=require('./Router/verifyuser')
const Verifytoken=require('./Router/verifytoken');
const signup=require('./Router/signup');
const login=require('./Router/login');
const products=require('./Router/products');
const order=require('./Router/order');
const myorders=require('./Router/myorders')
const cors=require('cors');

const app=new express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/verifyuser',Verifyuser);
app.use('/verifytoken',Verifytoken);
app.use('/signup',signup);
app.use('/login',login);
app.use('/products',products);
app.use('/order',order);
app.use('/myorders',myorders);
app.listen(9000);