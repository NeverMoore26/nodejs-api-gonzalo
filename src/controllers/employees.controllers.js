import { pool } from '../db.js';

export const getEmployees = async (req, res) => {
    try {
        // Realiza la consulta para obtener todos los empleados
        const [rows] = await pool.query('SELECT * FROM employee');

        // Envía los resultados
        res.send(rows);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la consulta
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

export const getEmployee = async (req, res) => {
    const { id } = req.params; // Obtiene el ID del empleado de los parámetros de la URL

    // Opcional: Validar que el ID es un número o una cadena que representa un número
    if (!id || isNaN(Number(id))) {
        return res.status(400).send({ error: "Invalid employee ID" });
    }

    try {
        // Realiza la consulta para obtener el empleado por su ID
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);

        // Verifica si se encontró algún empleado
        if (rows.length === 0) {
            return res.status(404).send({ error: "Employee not found" });
        }

        // Envía los datos del empleado encontrado
        res.send(rows[0]);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la consulta
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};


export const createEmployee = async (req, res) => {
    const { name, salary } = req.body;

    // Valida que el nombre y el salario no estén indefinidos
    if (name === undefined || salary === undefined) {
        return res.status(400).send({ error: "Name and salary are required" });
    }

    // Valida que el nombre sea una cadena
    if (typeof name !== 'string') {
        return res.status(400).send({ error: "Name must be a string" });
    }

    // Valida que el salario sea un número
    if (typeof salary !== 'number') {
        return res.status(400).send({ error: "Salary must be a number" });
    }

    try {
        // Realiza la inserción
        const [insertResult] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary]);

        // Obtiene el ID del empleado recién insertado
        const employeeId = insertResult.insertId;

        // Realiza una segunda consulta para obtener los datos del empleado
        const [employeeRows] = await pool.query('SELECT * FROM employee WHERE id = ?', [employeeId]);

        // Si se encontró el empleado, envía los datos
        if (employeeRows.length > 0) {
            res.send(employeeRows[0]);
        } else {
            res.status(404).send({ error: "Employee not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export const deleteEmployee = async (req, res) => {
    const { id } = req.params; // Obtiene el ID del empleado de los parámetros de la URL

    // Validación del ID
    if (!id || isNaN(Number(id))) {
        return res.status(400).send({ error: "Invalid employee ID" });
    }

    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [id]);

        // Verifica si se eliminó algún empleado
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Employee not found or already deleted" });
        }

        res.send(`Empleado ${id} eliminado`);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};


export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;

    // Validación de los datos
    if (!name || !salary || isNaN(Number(salary))) {
        return res.status(400).send({ error: "Invalid name or salary" });
    }

    try {
        // Realiza la operación de actualización
        const [result] = await pool.query('UPDATE employee SET name = ?, salary = ? WHERE id = ?', [name, salary, id]);

        // Verifica si se actualizó algún empleado
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Employee not found or not modified" });
        }

        res.send(`Empleado ${id} actualizado`);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la actualización
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};


