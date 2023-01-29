import Transaction from "../Models/transactionModel.js";

// create a transaction
export async function createTransaction(req, res, next) {
  const { name, type, amount } = req.body;
  if (!req.body) {
    return next({ status: 400, message: "invalid transaction" });
  }
  const transaction = await new Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });
  transaction.save();

  res.status(200).send({
    message: "transaction created successfully",
    transaction,
  });
}

//get all transactions

export async function getTransaction(req, res, next) {
  let data = await Transaction.find({});
  // let dataFilter = await data.map((v) =>
  //   Object.assign(
  //     {},
  //     { name: v.name, amount: v.amount, type: v.type, color: v.color }
  //   )
  // );
  res.status(200).send(data);
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
