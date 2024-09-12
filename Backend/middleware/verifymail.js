const kb = require("kickbox")

function checkValidEmail(req,res,next){
    var kickbox = kb.client(process.env.KICKBOX_API_KEY).kickbox();
    const {email} = req.body;
 
    kickbox.verify(email, function (err, response) {
          if(response){
              if(response.body.result === 'deliverable'){
                next()
              }else{
                 res.status(400).send("InValid email address")
              }
          }else{
              res.status(500).send("Internal server error")
          }
    });
}
module.exports = checkValidEmail