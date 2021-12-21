const Token = require('../models/token');


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
    // contectarse a firebase cloud messaging para enviar la notificacion al usuario receiver
    return res.status(500).json({
        message: "unimplemented FCM"
    })
}

module.exports = {
    register_token: register_token,
    delete_token: delete_token,
    send_msg: send_msg,
};