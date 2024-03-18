const db = require('../utils/database');

const createUser = async (user) => {
  const { name, lastName, email, passwordHash, document, affiliatedId } = user;
  const sql = `
    INSERT INTO Users (name, last_name, email, password, document, affiliated_id, role_id, active, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, (SELECT id FROM Roles WHERE name = 'Member'), 0, NOW(), NOW());
  `;
  const result = await db.query(sql, [name, lastName, email, passwordHash, document, affiliatedId]);
  return result[0].insertId;
};

module.exports = { createUser };
