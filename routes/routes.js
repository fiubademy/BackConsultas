const update_token = require("../controllers/updateToken");
const notify_user = require("../controllers/notifyUser");

function update_token_route() {
  return {
    method: "PUT",
    url: "/update_token",
    schema: update_token.schema(),
    handler: update_token.handler(),
  };
}

function notify_user_route() {
  return {
    method: "POST",
    url: "/notify_user",
    schema: notify_user.schema(),
    handler: notify_user.handler(),
  };
}

module.exports = [update_token_route, notify_user_route];
