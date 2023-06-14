const jwt = require('jsonwebtoken')
const UserModel = require('../DATABASE/Models/UserModel')

const generateToken = async (id) => {
    const token =  jwt.sign({id}, process.env.JWT_SECRETKEY)
    return token
}

const verifyToken = async (req, res, next) => {
  const token = req.cookies.userToken;
  console.log(token);

    if (!token){
        return res.status(300).send({ message: "token is not generated" })
    }

 try {
    const decoded=await jwt.verify(token,process.env.JWT_SECRETKEY)
    const user=await UserModel.findById(decoded).select('-password')
  //   localStorage.setItem('userInfo',JSON.stringify(user))
    //  req.user=user
    console.log(user);
    req.user=user;
  next()
 } catch (error) {
    res.send(error.message)
 }
     
}
module.exports = { generateToken, verifyToken }