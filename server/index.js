const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = 4020;

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/images', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/images/:id', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/product', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/product/:title', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/details', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

app.use('/reviews', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

app.use('/products', createProxyMiddleware({ target: 'http://localhost:3050', changeOrigin: true }));

app.use('/nav', createProxyMiddleware({ target: 'http://localhost:3006', changeOrigin: true }));
app.use('/search/:params', createProxyMiddleware({ target: 'http://localhost:3006', changeOrigin: true }));
app.use('/:id', createProxyMiddleware({ target: 'http://localhost:3006', changeOrigin: true }));


// app.use('/products/shades', createProxyMiddleware({ target: 'http://localhost:3050', changeOrigin: true }));
// app.use('/products/suggested', createProxyMiddleware({ target: 'http://localhost:3050', changeOrigin: true }));
// app.use('/suggested', createProxyMiddleware({ target: 'http://localhost:3050', changeOrigin: true }));
// app.use('/shades', createProxyMiddleware({ target: 'http://localhost:3050', changeOrigin: true }));
// app.use('/quickview', createProxyMiddleware({ target: 'http://localhost:3050', changeOrigin: true }));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));