import mongoose from "mongoose";
import log from './logger'
const connect = async () => {
    try {
        const con = await mongoose.connect(<string>process.env.MONGO_URI);
        log.info("DB CONNECTED");
    }
    catch (error) {
        log.info("NOT CONNECTED");
        process.exit(1);
    }
}
export default connect;