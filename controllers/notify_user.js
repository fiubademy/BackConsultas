const axios = require("axios");
const Token = require("../models/token");

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

    const payload = {
      registration_ids: token,
      notification: {
        title: "New message",
        body: req.body.message,
      },
    };

    axios
      .post("https://fcm.googleapis.com/fcm/send", payload)
      .then((res) => {
        return reply.code(200).send(res);
      })
      .catch((error) => {
        return reply.code(500).send(`Server error: ${error}`);
      });
  };
}

module.exports = { handler, schema };
