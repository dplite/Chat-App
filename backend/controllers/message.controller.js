import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    //socket io logic later

    // await conversation.save();
    // await newMessage.save();   USE Promise.all to save both at the same time.

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in Message Controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const userId = req.user._id; //coming from middleware protect route where we authenticate user and set req.user

    const conversation = await Conversation.findOne({
      participants: {
        $all: [userId, userToChat],
      },
    }).populate("messages"); // populates the messages field of the conversation and not just the reference

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (err) {
    console.log("Error in get Message Controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
