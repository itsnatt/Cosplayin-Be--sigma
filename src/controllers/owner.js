const pool = require('../db');

exports.getAllOwners = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM owner');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOwnerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM owner WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOwner = async (req, res) => {
  const { name, email, company, phone, sosmed, linkToko1, provinsi, kabupaten, status_id, address_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO owner (name, email, company, phone, sosmed, linkToko1, provinsi, kabupaten, status_id, address_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [name, email, company, phone, sosmed, linkToko1, provinsi, kabupaten, status_id, address_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOwner = async (req, res) => {
  const { id } = req.params;
  const { name, email, company, phone, sosmed, linkToko1, provinsi, kabupaten, status_id, address_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE owner SET name = $1, email = $2, company = $3, phone = $4, sosmed = $5, linkToko1 = $6, provinsi = $7, kabupaten = $8, status_id = $9, address_id = $10 WHERE id = $11 RETURNING *',
      [name, email, company, phone, sosmed, linkToko1, provinsi, kabupaten, status_id, address_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOwner = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM owner WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
