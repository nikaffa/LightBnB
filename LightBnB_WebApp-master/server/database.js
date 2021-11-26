const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

//DONE
const getUserWithEmail = function(email) {
  return pool.query(`SELECT * FROM users WHERE email = $1`, [email]) //returns a promise
    .then((result) => {
      if (result.rows.length) {
        console.log(result.rows[0]);
        return result.rows[0]; //returns res.rows as the result of a promise
      } else if (!result.rows.length) {
        console.log('null');
        return null;
      }
    })
    .catch((err) => console.log(err.message));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
//DONE
const getUserWithId = function(id) {
  return pool.query(`SELECT * FROM users WHERE id = $1`, [id]) //returns a promise
    .then((result) => {
      if (result.rows.length) {
        console.log(result.rows[0]);
        return result.rows[0]; //returns res.rows as the result of a promise
      } else if (!result.rows.length) {
        console.log('null');
        return null;
      }
    })
    .catch((err) => console.log(err.message));
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
//DONE
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users(name, email, password)
  VALUES($1, $2, $3)
  RETURNING *;`, [user.name, user.email, user.password]) //returns a promise
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0]; //returns res.rows as the result of a promise
    })
    .catch((err) => console.log(err.message));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
//DONE
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT * FROM properties
  JOIN reservations ON properties.id = property_id
  WHERE guest_id = $1 AND end_date < Now()
  LIMIT $2
  `, [guest_id, limit]) //returns a promise
    .then((result) => {
      console.log(result.rows);
      return result.rows;//returns res.rows as the result of a promise
    })
    .catch((err) => console.log(err.message));
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  //setup an array to hold any parameters that may be available for the query
  const queryParams = [];
  //start the query with all information that comes before the WHERE clause
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  //add the option to the params array and create a WHERE or AND clause for that option
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    if (queryParams.length > 1) {
      queryString += `AND owner_id = $${queryParams.length} `;
    } else {
      queryString += `WHERE owner_id = $${queryParams.length} `;
    }
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    if (queryParams.length > 1) {
      queryString += `AND cost_per_night /100 >= $${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night /100 >= $${queryParams.length} `;
    }
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    if (queryParams.length > 1) {
      queryString += `AND cost_per_night /100  <= $${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night /100  <= $${queryParams.length} `;
    }
  }
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    if (queryParams.length > 1) {
      queryString += `AND rating >= $${queryParams.length} `;
    } else {
      queryString += `WHERE rating >= $${queryParams.length} `;
    }
  }
  //add any query that comes after the WHERE/AND clause
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => console.log(err.message));
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query(`
  INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url,
  cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `,
  [property.owner_id, property.title, property.description, property.thumbnail_photo_url,
    property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province,
    property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms,
    property.number_of_bedrooms])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => console.log(err.message));
};
exports.addProperty = addProperty;
