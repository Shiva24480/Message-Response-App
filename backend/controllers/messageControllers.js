const Message = require("../models/messageModel");
const User = require("../models/userModel");

const fetchMessages = async (req, res) => {
    try {
        Message.find()
            .populate("postedBy")
            .then(p => res.send(p))
            .catch(error => console.log(error));
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

const sendMessage = async (req, res) => {
    const { content, userId } = req.body;

    if (!content || !userId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        postedBy: userId,
        content: content
    };

    try {
        var message = await Message.create(newMessage);
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}

module.exports = { sendMessage, fetchMessages }; 