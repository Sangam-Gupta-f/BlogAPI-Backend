import mongoose from "mongoose";


const connectDb=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}BlogAPI`)       
    } catch (error) {
        console.group("db not connt")
    }
}

export default connectDb;