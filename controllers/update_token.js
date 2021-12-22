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
  };
}

function handler() {
  return async function (req, reply) {
    const filter = {
      user_id: req.body.user_id,
    };
    const update = {
      token: req.body.token,
      createdAt: new Date(),
    };
    const options = {
      new: true,
      upsert: true,
    };

    Token.findOneAndUpdate(filter, update, options, (error, result) => {
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
