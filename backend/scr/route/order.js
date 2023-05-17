const express = require('express');
const router = express.Router();
// const tokenVerify = require('../middleware/auth');
const Order = require('../model/order');
const Product = require('../model/product');

//GET ALL ORDER
router.get('/order', async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET 1 ORDER BY ID
router.get('/order/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Order.findById(id).populate({
      path: 'productId',
      model: Product,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//POST
//localhost:4000/api/order
router.post('/order', async (req, res) => {
  // console.log('🚀 ~ file: order.js:34 ~ router.post ~ req:', req.body);
  const {
    cart: { cartTotalCount, cartItems },
    address,
    userId,
  } = req.body;
  let products = [];
  for (i = 0; i < cartItems.length; i++) {
    console.log(
      '🚀 ~ file: order.js:42 ~ router.post ~ cartItems:',
      cartItems[0]
    );
    products.push({
      productId: cartItems[i]._id,
      productName: cartItems[i].name,
      quantity: cartItems[i].cartQuantity,
    });
  }

  try {
    const result = await Order.create({
      userId,
      products,
      address,
      totalPrice: cartTotalCount,
    });
    console.log('🚀 ~ file: order.js:48 ~ router.post ~ result:', result);
    //   res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//UPDATA WITH PUT REQUEST
router.put('/order/:id', async (req, res) => {
  // console.log('🚀 ~ file: order.js:69 ~ router.put ~ req:', req);

  try {
    const orderId = req.params.id;
    const update = req.body;
    const options = { new: true }; // Return the updated order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      update,
      options
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
