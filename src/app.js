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


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());


app.get('/',(req,res) => {
    res.send('hallo mas')
    });


// Define route paths and associate them with route files
app.use('/api/address', addressRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/pengunjung', pengunjungRoutes);
app.use('/api/product', productRoutes);
app.use('/api/status', statusRoutes);
app.use('/image', express.static(path.join(__dirname, '/middleware/uploads')));

const PORT = process.env.PORT || 15004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
