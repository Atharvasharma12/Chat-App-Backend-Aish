const express =require('express')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')

dotenv.config({path:'./config.env'})

const app=express();

app.use(express.json())
app.use(cookieParser())
require('./DATABASE/dbConnect')
app.use(require('./Router/auth'))



app.listen(8000,()=>{
    console.log('server started at 8000');
})

// console.log(module);