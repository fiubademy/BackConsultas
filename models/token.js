const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: { type: String },
    user_id: { type: String, unique: true },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: 4000 },
      },
 });

module.exports = mongoose.model("Token", tokenSchema);

