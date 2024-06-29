const pool = require('../db');
const upload = require('../middleware/multer.js'); // Adjust the path to where the multer setup is


exports.getAllProducts = async (req, res) => {
  try {
    let query = 'SELECT * FROM product WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    // Tambahkan kondisi untuk filter berdasarkan kategori
    if (req.query.kategori) {
      query += ` AND (katagori1 = $${paramIndex} OR katagori2 = $${paramIndex} OR katagori3 = $${paramIndex})`;
      params.push(req.query.kategori);
      paramIndex++;
    }

    // Tambahkan kondisi untuk filter berdasarkan ukuran
    if (req.query.size) {
      query += ` AND (ukuran1 = $${paramIndex} OR ukuran2 = $${paramIndex} OR ukuran3 = $${paramIndex})`;
      params.push(req.query.size);
      paramIndex++;
    }

    // Tambahkan kondisi untuk filter berdasarkan judul (LIKE)
    if (req.query.judul) {
      query += ` AND NamaProduk ILIKE $${paramIndex}`;
      params.push(`%${req.query.judul}%`);
      paramIndex++;
    }

    const result = await pool.query(query, params);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};







exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM product WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product image by id
exports.updateProductImage = [
  upload.single('gambar'), // Expecting 'gambar' field from form-data
  async (req, res) => {
    const { id } = req.params;
    const gambar = req.file ? req.file.filename : null; // Get filename if uploaded

    try {
      const result = await pool.query(
        'UPDATE product SET gambar = $1 WHERE id = $2 RETURNING *',
        [gambar, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: `Product with id ${id} not found.` });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating product image:', err);
      res.status(500).json({ error: err.message });
    }
  }
];







/*
exports.createProduct = async (req, res) => {
  const { namaproduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, suka, visit, owner_id, admin_id, categoory_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO product (namaproduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, suka, visit, owner_id, admin_id, categoory_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',
      [namaproduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, suka, visit, owner_id, admin_id, categoory_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
// Create a product
exports.createProduct = [
  upload.single('gambar'), // Expecting 'gambar' field from form-data
  async (req, res) => {
    const { namaproduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, suka, visit, owner_id, admin_id, categoory_id } = req.body;
    const gambar = req.file ? req.file.filename : null; // Get filename if uploaded

    try {
      // Validate required fields (example)
      if (!namaproduk || !harga || !deskripsi) {
        return res.status(400).json({ error: 'Namaproduk, harga, and deskripsi are required.' });
      }

      const result = await pool.query(
        'INSERT INTO product (namaproduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, suka, visit, owner_id, admin_id, categoory_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',
        [namaproduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, suka, visit, owner_id, admin_id, categoory_id]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ error: err.message });
    }
  }
];


/*
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { namaproduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, suka, visit, owner_id, admin_id, categoory_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE product SET namaproduk = $1, ukuran1 = $2, ukuran2 = $3, ukuran3 = $4, link_produk = $5, harga = $6, satuan = $7, deskripsi = $8, katagori1 = $9, katagori2 = $10, katagori3 = $11, gambar = $12, suka = $13, visit = $14, owner_id = $15, admin_id = $16, categoory_id = $17 WHERE id = $18 RETURNING *',
      [namaproduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, suka, visit, owner_id, admin_id, categoory_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/



exports.updateProduct = [
  upload.single('gambar'), // Expecting 'gambar' field from form-data
  async (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    const fieldNames = Object.keys(fields);

    // Confirm if image file is uploaded and get the filename
    let gambar;
    if (req.file) {
      gambar = req.file.filename;
    }

    // Build SET part of the query based on the provided fields
    let querySet = fieldNames.map((field, index) => `${field} = $${index + 1}`).join(', ');
    let values = [...Object.values(fields)];

    // If image is uploaded, add image filename to values and extend querySet
    if (gambar) {
      querySet += `, gambar = $${fieldNames.length + 1}`;
      values.push(gambar);
    }

    // Add id for WHERE condition at the end
    values.push(id);

    try {
      // Log the SQL query string before execution
      console.log('SQL Query:', `UPDATE product SET ${querySet} WHERE id = $${values.length} RETURNING *`, values);

      const result = await pool.query(
        `UPDATE product SET ${querySet} WHERE id = $${values.length} RETURNING *`,
        values
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error('SQL Error:', err.message);
      res.status(500).json({ error: err.message });
    }
  }
];


exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM product WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
