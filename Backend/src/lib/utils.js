import jwt from "jsonwebtoken"

export default function generateToken(userId, res){
    const token = jwt.sign({userId},process.env.JWT_KEY,{
        expiresIn: "7d"
    })

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        // httpOnly: true,
        // sameSite: "None",
        // secure: process.env.NODE_ENV === "production"
    })

    return token
}