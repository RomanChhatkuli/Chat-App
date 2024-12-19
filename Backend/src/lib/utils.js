import jwt from "jsonwebtoken"

export default function generateToken(userId, res){
    const token = jwt.sign({userId},process.env.JWT_KEY,{
        expiresIn: "7d"
    })

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        sameSite: 'None', // SameSite only required for cross-origin requests (production)
        secure: true,  // Use secure cookies only in production (HTTPS)
    })
    
    return token
}