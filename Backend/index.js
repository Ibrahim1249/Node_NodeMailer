const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sendMailer, revertBackMail } = require("./mailer");
const checkValidEmail = require("./middleware/verifymail");
dotenv.config();

const app = express()
const port = process.env.PORT || 3000

app.use(cors({options : "*"}));
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.post("/mail",checkValidEmail ,(req,res)=>{
    const {name , email , message} = req.body;
    sendMailer(process.env.MY_USERNAME , process.env.MY_PASSWORD , name , email , message , res);
    revertBackMail(process.env.MY_USERNAME , process.env.MY_PASSWORD , name , email , message , res) 
})


app.listen(port ,()=>{
    console.log("server is running on port " , port)
})