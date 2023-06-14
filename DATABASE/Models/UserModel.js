const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    profImage: {
        type: String,
        default:'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
        
    },
    token:{
        type:String
    }
},
{
    timestamps:true
}
);

userSchema.methods.generateToken=async function(){
    try {
        const token=jwt.sign(this.id,process.env.JWT_SECRETKEY)
        return token
    } catch (error) {
        console.log('error at userSchema methods ');
    }
}
userSchema.pre('save',async function (next){

    try {
        if(!this.isModified('password')){
            next()
        }
        
        this.password=await bcrypt.hash(this.password,10);
        this.token=jwt.sign(this.id,process.env.JWT_SECRETKEY)
        next();
    } catch (error) {
        console.log('error at userSchema pre method');
    }
     
})


const UserModel=mongoose.model("User",userSchema);

module.exports=UserModel