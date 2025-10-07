import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const { _id: senderId } = req.user;
    const { id: receiverId } = req.params;
    const { message } = req.body;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new conversationModel({
        participants: [senderId, receiverId],
      });

      await conversation.save();
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([newMessage.save(), conversation.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({ data: newMessage, success: true });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { _id: senderId } = req.user;

    const conversation = await conversationModel
      .findOne({ participants: { $all: [senderId, receiverId] } })
      .populate("messages");

    if (!conversation) {
      return res.status(200).json({ data: [], success: true });
    }

    res.status(200).json({ data: conversation.messages, success: true });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export default {
  sendMessage,
  getMessages,
};
