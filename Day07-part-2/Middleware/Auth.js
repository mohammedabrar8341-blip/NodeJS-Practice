const jwt=require("jsonwebtoken")

const dotenv=require("dotenv")
dotenv.config()

const authMiddleware=(req,res,next)=>{
    const {token}=req.headers

    const payload=jwt.verify(token,process.env.JWT_SECRET)

    if(payload){
        req.userId=payload.id
        next()
    }else{
        res.status(401).json({
            msg:"Unauthorized"
        })
    }
}
module.exports=authMiddleware