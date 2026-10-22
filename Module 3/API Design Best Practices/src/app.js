const express = require('express');
const postRoutes = require('./routes/postRoutes');
const diagnosticsRoutes = require('./routes/diagnosticsRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { resetData } = require('./data/postStore');

function createApp() {
  const app = express();
  app.use(express.json());

  // Public contract: resource-oriented routes only.
  app.use('/posts', postRoutes);

  // Demo/testing route for a safe internal failure.
  app.use('/diagnostics', diagnosticsRoutes);

  // Everything else (including the old verb routes) is a structured 404.
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = 3000;
  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
}

module.exports = {
  createApp,
  resetData
};
