const Token = require("../models/token");

function schema() {
  return {
    body: {
      type: "object",
      properties: {
        token: { type: "string" },
        user_id: { type: "string" },
      },
    },
    required: ["user_id", "token"],
  };
}

function handler() {
  return async function (req, reply) {
    let token = new Token({
      token: req.body.token,
      user_id: req.body.user_id,
    });

    token.save((error, result) => {
      if (error) {
        return reply.code(500).send(`Server error: ${error}`);
      }
      if (!result) {
        return reply.code(400).send(`Client error: ${error}`);
      }
      return reply.code(200).send(result);
    });
  };
}

module.exports = { handler, schema };
