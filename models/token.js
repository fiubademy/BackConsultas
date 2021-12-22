const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: { type: String },
  user_id: { type: String, unique: true },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: 5259600 }, //2 months
  },
});

module.exports = mongoose.model("Token", tokenSchema);
