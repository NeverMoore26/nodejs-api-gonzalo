import { pool } from '../db.js';

export const ping = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT 1 + 1 AS result');
        res.json(result);
    } catch (error) {
        // Manejo del error
        console.error(error);
        res.status(500).send('Ocurrió un error en el servidor');
    }
}