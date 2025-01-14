const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    const fromAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!fromAccount || fromAccount.balance < amount) {
      throw new Error("Insufficient balance");
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      throw new Error("Recipient account not found");
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save({ session });
    await toAccount.save({ session });

    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
