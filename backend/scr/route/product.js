const express = require('express');
const router = express.Router();
const tokenVerify = require('../middleware/auth');
const Product = require('../model/product');

router.get('/product', tokenVerify, async (req, res) => {
  //tokenVerify, we will not add any authentication on user home page
  try {
    // console.log('req.query::', req.query);
    const page = parseInt(req.query.page) || 1; // get page number from query parameter, default to 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // get limit number from query parameter, default to 10 if not provided
    const startIndex = (page - 1) * limit; // calculate the starting index of the page
    const endIndex = page * limit; // calculate the ending index of the page
    // console.log('page:::', page, limit);

    const productsCount = await Product.find({ isActive: true }); // get total count of products with status 'active'
    // console.log('productsCount:::', productsCount.length);
    const products = await Product.find({ isActive: true })
      .skip(startIndex)
      .limit(limit); // get the products for the current page

    const pagination = {}; // create a pagination object to return in the response
    if (endIndex < productsCount.length) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res.status(200).json({
      count: products.length,
      total: productsCount.length,
      pagination: pagination,
      products: products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // try {
  //   const product = await Product.find({ where: { status: 'active' } });
  //   res.status(200).json(product);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
});

router.get('/product/:id', tokenVerify, async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.id });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
