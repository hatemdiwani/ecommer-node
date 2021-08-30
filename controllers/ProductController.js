const Product = require("../models/Product");

module.exports = {
  create: (req, res) => {
    console.log(req.body);
    
    let data = {
      name: req.body.name,
      price: req.body.price,
      qte: req.body.qte,
      description: req.body.description,
      category: req.body.category,
      image: req.file.filename,
    };

    Product.create(data, (err, product) => {
      if (err) {
        res.status(500).json({
          message: "product not created " + err,
          data: null,
        });
      } else {
        res.status(201).json({
          message: "product created successfuly ",
          data: product,
        });
      }
    });
  },

  deleteproduct: (req, res) => {
    Product.findByIdAndDelete({ _id: req.params.id }, (err, product) => {
      if (!product) {
        res.status(500).json({
          message: "product not exist " + err,
          data: null,
        });
      } else {
        res.status(201).json({
          message: "product deleted successfuly ",
          data: product,
        });
      }
    });
  },

  getproductbyid: (req, res) => {
    Product.findById({ _id: req.params.id })
      .populate({
        path: "category",
      })
      .then((product) => {
        res.status(201).json({
          message: "product found ",
          data: product,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "product not found ",
          data: null,
        });
      });
  },

  getalllproducts: (req, res) => {
    Product.find({})
      .populate({
        path: "category",
      })
      .then((products) => {
        res.status(201).json({
          message: "product in system ",
          data: products,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "no such product in system",
          data: null,
        });
      });
  },

  updateimage: (req, res) => {
    
    const data = {
      image: req.file.filename,
    };

    Product.findByIdAndUpdate({ _id: req.params.id }, data, (err, product) => {
      if (err) {
        res.status(500).json({
          message: "error updating product",
        });
      } else {
        res.status(200).json({
          message: "succesfuly updating product",
        });
      }
    });
  },


  updateproductinfo : (req , res) => {
    Product.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, product) => {
      if (err) {
        res.status(500).json({
          message: "error updating product",
        });
      } else {
        res.status(200).json({
          message: "succesfuly updating product",
        });
      }
    });
  }
};