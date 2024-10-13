import mongoose from "mongoose"

const localurl = "mongodb://localhost:27017";
const dbname = "finance-manager";

//const cloudurl = `mongodb+srv://${process.env.UNAME}:${process.env.PASS}@cluster0.tr1m5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

export const connectViaMongoose = async () => {
    try {
        await mongoose.connect(`${localurl}/${dbname}`);
        console.log("connected via mongoose");
    }
    catch (e) {
        console.log("connection failed with error" + " " + e);
        process.exit(1);
    }
}