import { pool } from "../db.js";
/**
 * This export creates a 'getEmployees' function
 *   that sends 'Getting employees' as a response.
 **/
export const getEmployees = async (req, res) => {
  const [rows] = await pool.query("SELECT id, name, salary FROM employee");
  res.json(rows);
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, salary FROM employee WHERE id = ?",
      [req.params.id]
    ); // Show the employee with the given ID in the console
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//Muts be an ASYNC function
export const createEmployees = async (req, res) => {
    const { name, salary } = req.body;
    try {
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    }); // -> We must use {} to get a JSON object
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateEmployees = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;
  try {
    // IFNULL(?, name), salary = IFNULL(?, salary) -> Means if name or salary is not provided, the original value will be retained
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query(
      "SELECT id, name, salary FROM employee WHERE id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
