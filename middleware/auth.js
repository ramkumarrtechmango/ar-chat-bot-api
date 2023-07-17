const jwt = require("jsonwebtoken");

const config = process.env;

function accessToken (id , email){
  return token = jwt.sign(
    { user_id: id, email },
    'BJ88roqnoN9CSzp0q9Kzjb8zZtbjyKNo',
    {
        expiresIn: "1h",
    }
);

};

function authenticateToken(req, res, next) {
  console.log('come')
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({
      message: 'UnAuthorized',
      status: 'fail',
    });
  }

  jwt.verify(token, 'BJ88roqnoN9CSzp0q9Kzjb8zZtbjyKNo', (err, result) => {
    console.log(err);
    if (err) {
      return next(err);
    }
    req.user = result;
    next();
  });
};

module.exports = {
  accessToken,
  authenticateToken
};