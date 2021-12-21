import { admin } from './firebase-config'
const Token = require('../models/token');
var admin = require("firebase-admin");
var serviceAccount = require("../ubademy-333005-firebase-adminsdk-nx2ut-1362938c8f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };


function register_token (req,res){
    let token = new Token({
        token: req.body.token,
    });

    token.save( (error,result) => {
        if (error){
            return res.status(500).json(`Server error: ${error}`);
        }
        if ( !result ){
            return res.status(400).json(`Client error: ${error}`);
        }
        return res.status(200).json(result);
    });
}

function delete_token (req,res){
    Token.deleteOne({ token: req.body.token}).exec( (error, msg) => {
        if (error){
            return res.status(500).json(`Server error: ${error}`);
        }
        return res.status(200).json(msg);
    })
}

function send_msg (req,res){
    // recibe el token del sender y el user_id del receiver
    const registrationToken = req.body.registrationToken
    const message = "You have a new message."
    const options =  notification_options
    
      admin.messaging().sendToDevice(registrationToken, message, options)
      .then( response => {
        res.status(200).send("Notification sent successfully")
      })
      .catch( error => {
        console.log(error);
      });
}

module.exports = {
    register_token: register_token,
    delete_token: delete_token,
    send_msg: send_msg,
};