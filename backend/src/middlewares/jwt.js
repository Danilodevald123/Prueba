const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

require('crypto').randomBytes(64).toString('hex')

// get config vars
dotenv.config();


function generateAccessToken(username,  expirationTime) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: expirationTime });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}


module.exports = {
  generateAccessToken,
  authenticateToken
}
