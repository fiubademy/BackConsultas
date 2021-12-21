const axios = require('axios')
const Token = require('../models/token');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function update_token (req,res){
    let token = new Token({
        token: req.body.token,
        user_id: req.body.userId,
    });
    
    token.save( (error,result) => {
        if (error){
            return res.status(500).json(`Server error: ${error}`);
        }
        if (!result){
            return res.status(400).json(`Client error: ${error}`);
        }
        return res.status(200).json(result);
    });
}


function notify_user (req,res){
    // recibe un userId y un mensaje y manda la notificación

    // chequear si el token expiro con 'updatedAt'. Si expiro, borrarlo y devolver 404
    const token = Token.findById({ user_id: req.body.userId }).exec( (error, result) => { 
        if (error){
            return res.status(500).json(`Server error: ${error}`);
        }
        if (!result){
            return res.status(404).json(`No user found.`);
        }
    });

    const payload = {
        registration_ids: token,
        notification: {
            title: "New message",
            body: req.body.message
        }
    }

    axios
    .post('https://fcm.googleapis.com/fcm/send', payload)
    .then(res => {
        return res.status(200).json(res);
    })
    .catch(error => {
        return res.status(500).json(`Server error: ${error}`);
    })
}

module.exports = {
    update_token: update_token,
    notify_user: notify_user,
};