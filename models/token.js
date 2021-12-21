const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: { type: String },
    user_id: { type: String, unique: true },
}, {
    timestamps: true
});

module.exports = mongoose.model("Token", tokenSchema);

