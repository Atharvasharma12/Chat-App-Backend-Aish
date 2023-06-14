const mongoose=require('mongoose')

const msgSchema=mongoose.Schema({
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        content:{type:String},
        chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Chat'
        }
},
{
    timstamps:true
}
);

const MessageModel=mongoose.model("Message",msgSchema)

module.exports=MessageModel