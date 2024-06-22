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

const app = express();

app.use(bodyParser.json());

// Define route paths and associate them with route files
app.use('/api/address', addressRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/pengunjung', pengunjungRoutes);
app.use('/api/product', productRoutes);
app.use('/api/status', statusRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
