const nodemailer = require("nodemailer")


async function sendMailer(myMail , myPassword , name , email , message , res){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: myMail,
          pass: myPassword,
        },
      });
    
       try{
         await transporter.sendMail({
             from : myMail,
             to : myMail,
             subject : "You got response from your website please check !!",
             text : `${name} with email ${email} has a message for you - ${message}`
          })
          res.status(200).send("message send successfully")
       }catch(error){
        res.status(500).send('Internal Server Error.');
       }
}

async function revertBackMail(myMail , myPassword , name , email , message , res){
   const transporter = nodemailer.createTransport({
    service : "gmail",
     auth :{
         user : myMail,
         pass : myPassword,
     }
   })

   try{
       await transporter.sendMail({
         from : myMail,
         to: email,
         subject : `Thanks ${name} for reaching to us !!`,
         text : `We will get back you to ${name}.\nIf we don't able to make it in a week please reach out us by sending us a mail on abcd@gmail.com`
       })
       console.log("message send successfully to user")
   }catch(error){
     console.log(error)
   }
}

module.exports = {
    sendMailer,
    revertBackMail
}