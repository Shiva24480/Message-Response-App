const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        content: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
)
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;