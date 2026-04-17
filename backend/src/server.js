import express from 'express'
import {connectdb} from './db/dbconnect.js'

const app = express();

async function startServer() {
    try {
        await connectdb();
    }catch (err){
        console.error("Failed to connect to DB:", err);
    }
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
    })
}
export{startServer , app};