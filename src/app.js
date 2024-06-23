const express = require('express');
const bodyParser = require('body-parser');
const addressRoutes = require('./routes/address');
const adminRoutes = require('./routes/admin');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');
const pengunjungRoutes = require('./routes/pengunjung');
const productRoutes = require('./routes/product');
const statusRoutes = require('./routes/status');
const pool = require('./db');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const accessLogStream = fs.createWriteStream(path.join('.', 'access.log'), { flags: 'a' });
app.use(morgan('combined', (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    'from', req.connection.remoteAddress
  ].join(' ');
}, { stream: accessLogStream }));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());





// Define route paths and associate them with route files
app.use('/api/address', addressRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/pengunjung', pengunjungRoutes);
app.use('/api/product', productRoutes);
app.use('/api/status', statusRoutes);

const PORT = process.env.PORT || 15004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
