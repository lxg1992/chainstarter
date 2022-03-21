const next = require('next');
const express = require('express');
const app = next({ dev: process.env.NODE_ENV !== 'production' });

const routes = require('./routes');

const PORT = 3000;

const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  express()
    .use(handler)
    .listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Listening on PORT:${PORT}`);
    });
});
