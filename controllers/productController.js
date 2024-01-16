const Product = require("../models/productModel");
exports.getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.getRelateProducts = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("User update sucessfully");
  } catch (err) {
    res.status(422).json(err);
  }
};
exports.newProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct);
  } catch (error) {
    res.status(422).json(error);
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted sucessfully");
  } catch (err) {
    res.status(404).json(err);
  }
};
exports.updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("Product update sucessfully");
  } catch (err) {
    res.status(422).json(err);
  }
};
