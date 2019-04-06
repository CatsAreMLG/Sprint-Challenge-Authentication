const db = require('../database/dbConfig')

module.exports = {
  getUsers,
  addUser
}

function getUsers() {
  return db('users').first()
}
function addUser(body) {
  return db('users')
    .insert(body)
    .then(ids => ids[0])
}
