const express = require("express");
const router = express.Router();
const MessageModel = require("../models/messageModel");
const verifyToken = require("../middleware/auth");
const rasaService = require("../services/rasa.service");

// Route to get all messages
router.get("/messages", verifyToken, async (req, res) => {
  try {
    const messages = await MessageModel.find({ user: req.userId });
    res.json({
      success: "true",
      messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new message
router.post("/send", verifyToken, async (req, res) => {
  const { userQuestion } = req.body;

  const botAnswer = await rasaService.send(userQuestion);

  try {
    const newMessage = new MessageModel({
      user: req.userId,
      userQuestion,
      botAnswer,
    });

    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update a message by ID
router.put("/messages/:id", async (req, res) => {
  const messageId = req.params.id;
  const { userQuestion, botAnswer } = req.body;

  try {
    const updatedMessage = await MessageModel.findByIdAndUpdate(
      messageId,
      { userQuestion, botAnswer },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(updatedMessage);
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
