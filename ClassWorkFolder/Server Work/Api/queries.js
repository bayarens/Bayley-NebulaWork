const Pool = require('pg').Pool

const pool = new Pool({
    user: "bayleyarens",
    host: "localhost",
    // database: "music",
    database: "airplanes",
    password: "postgres",
    port: 5432
  });
  
  const getPlanes = (request, response) => {
    pool.query('SELECT * FROM plane', (error, result) => {
      if(error){
        throw error;
      }
      response.status(200).json(result.rows);
    });
  }
  
  const addPlanes = (request, response) => {
    const { name, modelcod } = request.body;
    pool.query(
      `INSERT INTO plane (name, modelcod) VALUES ($1, $2)`,
      [name, modelcod],
      (error, results) => {
        if(error){
          throw error;
        }
        response.status(200).json(results.rows);
      }
    )
  }
  
  module.exports = {
    getPlanes: getPlanes,
    addPlanes: addPlanes
  };