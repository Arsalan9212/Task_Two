const express = require('express');
const router = express.Router();
const tokenVerify = require('../middleware/auth');
const Product = require('../model/product');

router.get('/product', tokenVerify, async (req, res) => {
  //tokenVerify,
  try {
    // console.log('req.query::', req.query);
    const page = parseInt(req.query.page) || 1; // get page number from query parameter, default to 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // get limit number from query parameter, default to 10 if not provided
    const startIndex = (page - 1) * limit; // calculate the starting index of the page
    const endIndex = page * limit; // calculate the ending index of the page
    // console.log('page:::', page, limit);
    let query = { isActive: false }; // initialize query with isActive false

    if (req.query.search) {
      query.name = { $regex: search, $options: 'i' }; // add search term to query
    }

    const productsCount = await Product.find().countDocuments(); // get total count of products matching the query
    const products = await Product.find().skip(startIndex).limit(limit); // get the products for the current page

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
  //   const product = await Product.find({ where: { isActive: false || true } });

  //   res.status(200).json(product);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
});

//POST
//localhost:4000/api/product
router.post('/product', tokenVerify, async (req, res) => {
  try {
    const data = new Product({
      title: req.body.title,
      name: req.body.name,
      desc: req.body.desc,
      size: req.body.size,
      price: req.body.price,
    });
    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// put request
router.put('/put/:id', async (req, res) => {
  try {
    const result = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log(req.params.id);
    const updateData = await Product.findById(req.params.id); // No need to use this line for the response
    res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE DATA
//localhost:4000/api/admin/delete/id    (which we want to delete)
router.delete('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'product is deleted on the base of id' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//SEARCH
// router.get('/search/:key', async (req, res) => {
//   const result = await Product.find({
//     $or: [
//       {
//         name: { $regex: req.params.key },
//       },
//       {
//         title: { $regex: req.params.key },
//       },
//     ],
//   });
//   res.status(200).json(result);
// });
module.exports = router;
