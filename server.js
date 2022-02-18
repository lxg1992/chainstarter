const { createServer } = require('http');
const next = require('next');
const app = next({ dev: process.env.NODE_ENV !== 'production' });

const routes = require('./routes');

const PORT = 3000;

const hanlder = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Ready on localhost:${PORT}`);
  });
});
