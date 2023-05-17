const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const setupDatabase = require('./scr/config/database');

const userRoute = require('./scr/route/user');
const productRoute = require('./scr/route/product');
const orderRoute = require('./scr/route/order');
const adminProductRoute = require('./scr/route/adminProductRoute');
const adminOrderRoute = require('./scr/route/adminOrderRoute');

const authMiddleware = require('./scr/middleware/auth');
const bodyParser = require('body-parser');
const port = process.env.PORT;

setupDatabase();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// apply middleware
// get resposne
/*
id role is to admin 
    call admin routes
    else idf role is to user
    call user routes
*/
// (async function () {
//   console.log('authMiddleware:::', authMiddleware());
// })();
// app.use(auth)

app.use('/api', userRoute);

app.use('/api/user', productRoute);
app.use('/api/user', orderRoute);

app.use('/api/admin', authMiddleware, adminProductRoute);
app.use('/api/admin', authMiddleware, adminOrderRoute);

app.use('*', (req, res) => {
  res.json('page is not found');
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
