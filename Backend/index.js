const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();

const app = express()
const port = process.env.PORT || 3000

app.use(cors({options : "*"}));
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.post("/mail",(req,res)=>{
    const {name , email , message} = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MY_USERNAME,
          pass: process.env.MY_PASSWORD,
        },
      });

      let msg = {
         from : process.env.MY_USERNAME,
         to : process.env.MY_USERNAME,
         subject : "You have got a message please check",
         text : `${name} with email ${email} has a message for you - ${message}`
      }

      transporter.sendMail(msg).then((info)=>{console.log("Email Sent: " + info.response);}).catch((error)=>{console.log(error)})
})


app.listen(port ,()=>{
    console.log("server is running on port " , port)
})