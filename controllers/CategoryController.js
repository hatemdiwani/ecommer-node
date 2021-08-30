const Category = require("../models/Catrgory");

module.exports = {
  createcategory: (req, res) => {
    let data = {
      name: req.body.name,
      icon: req.file.filename,
    };
    Category.create(data, (err, category) => {
      if (err) {
        res.status(500).json({
          message: "category not created " + err,
          data: null,
        });
      } else {
        res.status(201).json({
          message: "category  created ",
          data: category,
        });
      }
    });
  },

  getallcategories: (req, res) => {
    Category.find({}, (err, categories) => {
      if (!categories) {
        res.status(500).json({
          message: "no categories " + err,
          data: null,
        });
      } else {
        res.status(200).json({
          message: "categories in system",
          data: categories,
        });
      }
    });
  },


  upadatecategory: (req, res) => {
    let data = {
      name: req.body.name,
      icon: req.file.filename,
    };
    Category.findByIdAndUpdate(
      { _id: req.paramms.id },
      data,
      (err, category) => {
        if (err) {
          res.status(500).json({
            message: " catgory not updated " + err,
            data: null,
          });
        } else {
          res.status(200).json({
            message: "category updated successfuly",
            data: category,
          });
        }
      }
    );
  },

  deletecategory: (req, res) => {
    Category.findByIdAndDelete({ _id: req.params.id }, (err, category) => {
      if (err) {
        res.status(500).json({
          message: " catgory not deleted" + err,
          data: null,
        });
      } else {
        res.status(200).json({
          message: "category deleted successfuly",
          data: category,
        });
      }
    });
  },

  getcategorybyid: (req, res) => {
    Category.findById({ _id: req.paramms.id }, (err, category) => {
      if (err) {
        res.status(500).json({
          message: " catgory not found " + err,
          data: null,
        });
      } else {
        res.status(200).json({
          message: "category found",
          data: category,
        });
      }
    });
  },
};