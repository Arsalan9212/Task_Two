const express = require('express');
const router = express.Router();
const tokenVerify = require('../middleware/auth');
const Order = require('../model/order');
const Product = require('../model/product');

//GET ALL ORDER
router.get('/order', tokenVerify, async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET 1 ORDER BY ID
router.get('/order/:id', tokenVerify, async (req, res) => {
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

//UPDATA WITH PUT REQUEST
router.put('/order/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    // console.log('🚀 ~ file: adminOrderRoute.js:35 ~ router.put ~ orderId:',orderId);
    const update = req.body;
    const options = { new: true }; // Return the updated order
    // console.log('🚀 ~ file: adminOrderRoute.js:38 ~ router.put ~ update:',update);
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      update,
      options
    );
    res.status(200).json(updatedOrder);
    console.log(res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
