const pool = require('../db');

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM product');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

exports.createProduct = async (req, res) => {
  const { NamaProduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, like, visit, owner_id, admin_id, categoory_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO product (NamaProduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, like, visit, owner_id, admin_id, categoory_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',
      [NamaProduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, like, visit, owner_id, admin_id, categoory_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { NamaProduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, like, visit, owner_id, admin_id, categoory_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE product SET NamaProduk = $1, ukuran1 = $2, ukuran2 = $3, ukuran3 = $4, link_produk = $5, harga = $6, satuan = $7, deskripsi = $8, katagori1 = $9, katagori2 = $10, katagori3 = $11, gambar = $12, like = $13, visit = $14, owner_id = $15, admin_id = $16, categoory_id = $17 WHERE id = $18 RETURNING *',
      [NamaProduk, ukuran1, ukuran2, ukuran3, link_produk, harga, satuan, deskripsi, katagori1, katagori2, katagori3, gambar, like, visit, owner_id, admin_id, categoory_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM product WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
