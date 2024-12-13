import mongoose from 'mongoose'

export const connectDB = async () =>{
    main().then(() =>{
        console.log("Connected to MongoDB Successfully.")
    }).catch((err) =>{
        console.log(err)
    })
     
    async function main(){
        await mongoose.connect(process.env.MONGODB_URI)
    }
}