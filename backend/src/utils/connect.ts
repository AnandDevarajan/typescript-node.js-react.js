import mongoose from "mongoose";

const connect = async () => {
    try {
        const con = await mongoose.connect(<string>process.env.MONGO_URI);
        console.log("DB CONNECTED");
    }
    catch (error) {
        console.log("NOT CONNECTED");
        process.exit(1);
    }
}
export default connect;