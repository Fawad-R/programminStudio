const jsonwebtoken = require('jsonwebtoken');
let key = 'aijfaojfspaosjfam02102!#@!@12';
const Auth = async (req, res, next) => {
  let headerToken;
  try {
    console.log(req.cookies)
    if (req.cookies.authToken || req.headers.token) {
      headerToken = req.cookies.authToken;
    }
    console.log('verifying')
    jsonwebtoken.verify(headerToken, key, (err, authToken) => {
      if (err) {
        console.log('err in auth')
        return res.status(404).send(err);
      }
      req.authToken = authToken;
      next();
    });
  } catch (error) {
    console.log('error',error)
    res.status(500).send('error in auth');
  }
};

module.exports = Auth;
