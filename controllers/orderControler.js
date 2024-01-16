require("dotenv").config();
const Order = require("../models/orderModel");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
exports.CreateOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(201).json(saveOrder);
  } catch (error) {
    res.status(422).json(error);
  }
};

exports.OrderDetail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "orderItems.product"
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.GetUserOrder = async (req, res) => {
  try {
    const order = await Order.find({ email: req.params.email });
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.GetAllOrder = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.DeleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted sucessfully");
  } catch (err) {
    res.status(404).json(err);
  }
};
exports.getBill = async (req, res) => {
  const userEmail = req.body.email;
  const userOrder = req.body.orderItems;
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Your Order",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: "Jerome",
      intro: "Your bill has arrived!",
      table: {
        data: userOrder.map((item) => ({
          item: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      outro: "Thank you for order with us!",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Hi, This is your Order",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};
