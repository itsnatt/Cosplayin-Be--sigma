const pool = require('../db');

exports.getAllAddresses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM address');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM address WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAddress = async (req, res) => {
  const { provinsi, kabupaten } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO address (provinsi, kabupaten) VALUES ($1, $2) RETURNING *',
      [provinsi, kabupaten]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  const { id } = req.params;
  const { provinsi, kabupaten } = req.body;
  try {
    const result = await pool.query(
      'UPDATE address SET provinsi = $1, kabupaten = $2 WHERE id = $3 RETURNING *',
      [provinsi, kabupaten, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM address WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
