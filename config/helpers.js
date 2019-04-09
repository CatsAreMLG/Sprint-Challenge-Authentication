const db = require('../database/dbConfig')

module.exports = {
  findUser,
  addUser
}
function findUser(user) {
  return db('users')
    .where({ username: user.username })
    .first()
}
function addUser(body) {
  return db('users')
    .insert(body)
    .then(ids => ids[0])
}
