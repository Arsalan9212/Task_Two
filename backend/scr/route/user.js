const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

//SIGNUP WITH BCRYPT PASSWORD
router.post('/signup', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({ message: 'email already exist' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    if (data) {
      const token = jwt.sign(
        {
          email: req.body.email,
          role: data.isAdmin,
        },
        'this is dummy text',
        { expiresIn: '24h' }
      );
      // localStorage.setItem('token', req.body.token);
      return res.status(200).json({
        message: 'User created',
        user: {
          id: data._id,
          email: req.body.email,
          isAdmin: data.isAdmin,
          token: token,
        },
      });
    } else {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//SIGNIN
router.post('/login', async (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(409).json({ message: 'email not exist' });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          res.status(401).json({ msg: 'password matching failed' });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              role: user.isAdmin,
            },
            'this is dummy text',
            { expiresIn: '24h' }
          );
          res.status(200).json({
            user: {
              id: user._id,
              email: user.email,
              role: user.isAdmin,
              token: token,
            },
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
