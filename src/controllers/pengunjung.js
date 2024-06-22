const pool = require('../db');

const getAllPengunjung = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pengunjung');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPengunjungById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM pengunjung WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPengunjung = async (req, res) => {
  const { ip_address, tanggal } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pengunjung (ip_address, tanggal) VALUES ($1, $2) RETURNING *',
      [ip_address, tanggal]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePengunjung = async (req, res) => {
  const { id } = req.params;
  const { ip_address, tanggal } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pengunjung SET ip_address = $1, tanggal = $2 WHERE id = $3 RETURNING *',
      [ip_address, tanggal, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePengunjung = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM pengunjung WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPengunjung,
  getPengunjungById,
  createPengunjung,
  updatePengunjung,
  deletePengunjung
};