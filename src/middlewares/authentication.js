const jwt = require('jsonwebtoken');

async function authenticationMiddleware(req, res, next) {
  console.log(process.env.MONDAY_SIGNING_SECRET);
  console.log(process.env);
  try {
    // let { authorization } = req.headers;
    // if (!authorization && req.query) {
    // }
    authorization = process.env.MONDAY_TOKEN;
    const { accountId, userId, backToUrl, shortLivedToken } = jwt.verify(
      authorization,
      process.env.MONDAY_SIGNING_SECRET
    );
    req.session = { accountId, userId, backToUrl, shortLivedToken };
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'not authenticated' });
  }
}

module.exports = {
  authenticationMiddleware,
};
