const mongoose=require('mongoose')



const DB=process.env.DATABASE;
mongoose.connect('mongodb+srv://aishwaryvishwakarma11:React-chat-app@cluster0.ifxncep.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('database connection is successful'))
.catch(err=>console.log(err))