const Contact = require('../models/chats-model');

function add_msg (req,res){
    let chat = new Chat({
        message: req.body.message,
        sender: req.body.sender,
        receiver: req.body.receiver
    });

    chat.save( (error,result) => {
        if (error){
            return res.status(500).json({
                error: true,
                message: `Server error: ${error}`,
                code: 0
            });
        }

        if ( !result ){
            return res.status(400).json({
                error: true,
                message: `Client error: ${error}`,
                code: 20
            });
        }

        return res.status(200).json({
            error: false,
            message: 'Success',
            data: result,
            code: 10
        });

    });
}

function get_chat (req,res){
    return res.status(500).json({
        error: true,
        message: `Unimplemented: ${error}`,
        code: 0
    });
}

function get_open_chats (req,res){
    return res.status(500).json({
        error: true,
        message: `Unimplemented: ${error}`,
        code: 0
    });
}

module.exports = {
    get_chat: get_chat,
    add_msg: add_msg,
    get_open_chats: get_open_chats
};