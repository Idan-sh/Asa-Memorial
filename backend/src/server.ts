import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// PostgreSQL client setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

// Enable CORS and JSON parsing
app.use(cors()); 
app.use(express.json());

// Test route
app.get('/api', (req, res) => {
  res.send({ message: 'Backend is running' });
});

// Add memory form submission route
app.post('/api/add-memory', async (req, res) => {
  const { firstName, nickname, lastName, relation, message } = req.body;

  try {
    const query = `
      INSERT INTO memories (first_name, nickname, last_name, relation, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [firstName, nickname, lastName, relation, message];
    const result = await pool.query(query, values);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Error inserting memory into the database', err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});