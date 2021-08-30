const Order = require("../models/Order");
const User = require("../models/User");

module.exports = {
  createorder: (req, res) => {
    Order.create(req.body, (err, order) => {
      if (err) {
        res.status(500).json({
          message: "order not created " + err,
          data: null,
        });
      } else {
        User.findOneAndUpdate(
          { _id: req.body.client, __t: "client" },
          { $push: { orders: order._id } },
          (error, user) => {
            if (error) {
              res.status(500).json({
                message: "order added but not pushed in user  ",
                data: null,
              });
            } else {
              res.status(200).json({
                message: "order added and pushed in user  ",
                data: null,
              });
            }
          }
        );
      }
    });
  },

  getbyid: (req, res) => {
    Order.findById({ _id: req.params.id })
      .populate({
        path: "client",
      })
      .populate({
        path: "products",
        populate: {
          path: "category",
        },
      })
      .then((order) => {
        res.status(200).json({
          message: "order found ",
          data: order,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "order not found ",
          data: null,
        });
      });
  },

  getall: (req, res) => {
    Order.find({})
      .populate({
        path: "client",
      })
      .populate({
        path: "products",
        populate: {
          path: "category",
        },
      })
      .then((orders) => {
        res.status(200).json({
          message: "orders in system ",
          data: orders,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "no orders from systemm ",
          data: null,
        });
      });
  },

  update: (req, res) => {
    Order.findByIdAndUpdate(
      { _id: req.params.id },
      { livred: req.body.livred },
      (err, order) => {
        if (err) {
          res.status(500).json({
            message: "order not updated " + err,
            data: null,
          });
        } else {
          Order.findById({ _id: req.params.id })
            .populate({ path: "client" })
            .populate({
              path: "products",
              populate: {
                path: "category",
              },
            })
            .then((orders) => {
              res.status(200).json({
                message: "orders ",
                data: orders,
              });
              PopulateRes(orders);
            })
            .catch((err) => {
              res.status(500).json({
                message: "error updateing",
                data: null,
              });
            });
        }
      }
    );
  },

  dateleorder: (req, res) => {
    Order.findByIdAndDelete({ _id: req.params.id }, (err, order) => {
      if (err) {
        res.status(500).json({
          message: "error deleting order",
          data: null,
        });
      } else {
        res.status(200).json({
          message: "success deleting order",
          data: order,
        });
      }
    });
  },

  getordersbyclientid: (req, res) => {

    console.log('dfxgsg');
    Order.find({ client: req.user.id }, (err, orders) => {
      console.log(orders);
      if (err) {
        res.status(500).json({
          message : 'no orders',
          data : []
        })
      } else {
        res.status(200).json({
          message:"user orders",
          data: orders,
        });
      }
    });
  },


};
