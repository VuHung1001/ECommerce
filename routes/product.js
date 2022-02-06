const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT BY ID
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//find product by name
router.post("/find", async (req, res) => {
  const name = req.body.name;
  try {
    const products = await Product.find(
      {$or:[
        {"title":
          { $regex: new RegExp("^" + name, "i") } 
        },
        {'category':
          { $regex: new RegExp("^" + name, "i") } 
        }
      ]}
    );
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qSort = req.query.sort;
  const qCategory = req.query.category;
  let category = req.query.category ? req.query.category : 'All Products';
  let sort;
  
  switch (qSort) {
    case "desc":
      sort = { price: -1 }
      break;
    case "asc":
      sort = {price: 1}
      break;
    default:
      sort = { createdAt: -1 }
      break;
  }

  try {
    let products;

    if(qSort || qCategory){
      products = await Product.find(
        category === 'All Products' ? {} 
          : {
            category: {
              $in: [category],
            },
          }
      ).sort(sort);
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
