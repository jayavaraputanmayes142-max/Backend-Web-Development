// This is the ONLY file in the project that reads process.env.
// Every other file imports values from here.
module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  maxArticles: parseInt(process.env.MAX_ARTICLES, 10) || 50,
};
