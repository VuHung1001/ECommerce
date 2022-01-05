const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME
// this method return incomes in each months
// in last two months
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  //get last two months from now
  const lastTwoMonths = new Date(new Date().setMonth(new Date().getMonth() - 2));
  const productId = req.query.pid;
  try {
    const income = await Order.aggregate([
      { $match: { 
        createdAt: { $gte: lastTwoMonths } ,
        ...(productId && {
          products: {
            $elemMatch: { productId }
          }
        })
      } },
      {
        $project: {
          month: { $month: "$createdAt" },
          amounts: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$amounts" },
        },
      },
      {
        $sort: {_id: -1}
      },
      {
        $limit: 4
      }
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
