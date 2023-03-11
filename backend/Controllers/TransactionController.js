import Transaction from "../Models/transactionModel.js";

// create a transaction
export async function createTransaction(req, res, next) {
  const { name, type, amount } = req.body;
  try {
    if (!req.body) {
      return next({ status: 400, message: "invalid transaction" });
    }
    const transaction = await new Transaction({
      name,
      type,
      amount,
      date: new Date(),
    });
    if (!transaction.name || !transaction.amount || !transaction.type) {
      return res.status(400).send({ message: "invalid transaction" });
    }
    if (transaction) {
      transaction.save();
      res.status(200).send({
        message: "transaction created successfully",
        transaction,
      });
    }
  } catch {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
}

//get all transactions

export async function getTransaction(req, res, next) {
  // let data = await Transaction.find({}).select("user: _id");
  // let dataFilter = await data.map((v) =>
  //   Object.assign(
  //     {},
  //     { name: v.name, amount: v.amount, type: v.type, color: v.color }
  //   )
  // );
  try {
    const transaction = req.user;
    const data = await Transaction.findOne({ transaction });
    console.log(data);
    if (!data) {
      res.status(401).json({
        message: "Transaction not successful",
        error: "Transaction not found",
      });
    } else {
      res.status(200).json({
        message: "Transaction successful found",
        data,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
  // res.status(200).send(data);
}

// delete all transactions
export async function deleteAllTransaction(req, res, next) {
  if (!req.body) {
    res.status(400).send({
      message: "request body not found",
    });
  }
  await Transaction.deleteOne(req.body, function (err) {
    if (!err) {
      res.status(200).send("record deleted...!");
    }
  })
    .clone()
    .catch(function (err) {
      res.send("Error: deleting transaction " + err.message);
    });
}
