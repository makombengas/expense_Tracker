import Category from "../Models/categoryModel.js";

//Post request
export async function createCategories(req, res, next) {
  const specify = req.body;
  const category = await new Category(specify);
  if (!category) {
    return next({ status: 400, message: "invalid category" });
  }
  category.save();

  res.status(200).send({
    message: "categories created successfully",
    category,
  });
}
export async function getCategories(req, res, next) {
  let data = await Category.find({});
  let dataFilter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  res.status(200).send(dataFilter);
}

//Get request
