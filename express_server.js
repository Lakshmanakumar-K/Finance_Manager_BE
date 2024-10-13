import express from "express"
import { connectViaMongoose } from "./db_utils/mongoose.js"
import { usersRouter } from "./routes/auth.js"
import cors from "cors"
import { transactionsRouter } from "./routes/transactions.js";

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(cors());

server.use("/auth",usersRouter);
server.use("/transactions",transactionsRouter);

await connectViaMongoose();

server.listen(PORT, ()=>{
    console.log("server listening on port 3000")
});