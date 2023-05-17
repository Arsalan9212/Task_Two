const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, 'this is dummy text');
    next();
    console.log('🚀 ~ file: auth.js:7 ~ decode:', decode);
    // switch (decode.role) {
    //   case true:
    //     if (req.originalUrl.includes('admin')) {
    //       console.log('got success');
    //       next();
    //     } else {
    //       return res.status(403).json({ message: 'Forbidden ADMIN' });
    //     }
    //     break;
    //   case false:
    //     if (req.originalUrl.includes('user')) {
    //       console.log('got success user');
    //       next();
    //     } else {
    //       return res.status(403).json({ message: 'Forbidden USER' });
    //     }
    //     break;
    //   default:
    //     return res.status(400).json({ message: 'invalid TOKEN' });
    // }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
