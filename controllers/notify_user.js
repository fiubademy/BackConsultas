const axios = require("axios");
const Token = require("../models/token");

const firebase_key =
  "AAAAiALA1kU:APA91bH93BUMODE0gqqXftgn1sZlLiI2gLelpsguZT0L63HLSLPVutH-ncsuCAMCCvdimMMtIoQKIs0zHbfsMA8yPUwUpjoa1dRwq6ZbYiTkqcBDhDOWnfIOyomv8WaikKlfepkwLA9-";

function schema() {
  return {
    body: {
      type: "object",
      properties: {
        user_id: { type: "string" },
        message: { type: "string" },
      },
    },
  };
}

function handler() {
  return async function (req, reply) {
    const token = await Token.findOne({ user_id: req.body.user_id });
    if (token == null) {
      reply.code(404).send("No FCM token found for user.");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${firebase_key}`,
      },
    };

    const payload = {
      to: token.token,
      notification: {
        title: "New message",
        body: req.body.message,
      },
    };

    axios
      .post("https://fcm.googleapis.com/fcm/send", payload, config)
      .then((res) => {
        return reply.code(200).send(res.data);
      })
      .catch((error) => {
        return reply
          .code(401)
          .send(`Server error on send notification: ${error}`);
      });
  };
}

module.exports = { handler, schema };
