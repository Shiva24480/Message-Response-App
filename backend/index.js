const express = require('express');
var cors = require('cors')
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes')

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
connectDb();

app.use("/api", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/",(req,res)=>{
    res.send("server is running");
})

app.listen(5050, ()=>{
    console.log("server has started");
})