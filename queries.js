const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tracker",
  password: "Thenilo2k7!",
  port: 5432
});

//Get All

const getCategories = (request, response) => {
  pool.query(
    "SELECT * FROM categories ORDER BY categoryid",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createCategory = (request, response) => {
  const { category, description, isexpense } = request.body;
  pool.query(
    "INSERT INTO categories (category, description, isexpense) VALUES ($1, $2, $3)",
    [category, description, isexpense],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Category Added with ID: ${results.insertId}`);
    }
  );
};

const updateCategory = (request, response) => {
  const id = parseInt(request.params.id);
  const { category, description, isexpense } = request.body;
  pool.query(
    "UPDATE categories SET category = $1, description = $2, isexpense=$3 WHERE categoryid = $4",
    [category, description, isexpense, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`category modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM categories WHERE categoryid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with Id: ${id}`);
    }
  );
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteUser
};
