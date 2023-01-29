import Transaction from "../Models/transactionModel.js";

// get categories and transaction
export async function getLabels(req, res, next) {
  await Transaction.aggregate([
    {
      $lookup: {
        from: "category",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send("Lookup collection error");
    });
}
