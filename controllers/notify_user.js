const axios = require("axios");
const Token = require("../models/token");

const firebase_key = "AAAAiALA1kU:APA91bH93BUMODE0gqqXftgn1sZlLiI2gLelpsguZT0L63HLSLPVutH-ncsuCAMCCvdimMMtIoQKIs0zHbfsMA8yPUwUpjoa1dRwq6ZbYiTkqcBDhDOWnfIOyomv8WaikKlfepkwLA9-"

function schema() {
  return {
    body: {
      type: "object",
      properties: {
        receiver_id: { type: "string" },
        message: { type: "string" },
      },
    }
  };
}

function handler() {
  return async function (req, reply) {
    const token = Token.findById({ user_id: req.body.user_id }).exec(
      (error, result) => {
        if (error) {
          return reply.code(500).send(`Server error: ${error}`);
        }
        if (!result) {
          return reply.code(404).send(`No user found.`);
        }
      }
    );
    const config = {
      headers: {
        header1: firebase_key,
      }
    };

    const payload = {
      to: token,
      notification: {
        title: "New message",
        body: req.body.message,
      },
    };

    axios
      .post("https://fcm.googleapis.com/fcm/send", payload, config)
      .then((res) => {
        return reply.code(200).send(res);
      })
      .catch((error) => {
        return reply.code(500).send(`Server error: ${error}`);
      });
  };
}

module.exports = { handler, schema };
