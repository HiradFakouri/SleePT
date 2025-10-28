const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  messages: [
    {
      role: String,
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.models.Chat || mongoose.model("Chat", chatSchema);