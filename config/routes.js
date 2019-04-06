const axios = require('axios')
const bcrypt = require('bcryptjs')

const Users = require('./helpers')
const { authenticate } = require('../auth/authenticate')

module.exports = server => {
  server.post('/api/register', register)
  server.post('/api/login', login)
  server.get('/api/users', get)
  server.get('/api/jokes', authenticate, getJokes)
}

const register = async (req, res) => {
  const { body } = req
  if (body && body.username && body.password) {
    const hash = bcrypt.hashSync(body.password, 14)
    body.password = hash
    try {
      const added = await Users.addUser()
      res.status(201).json(added)
    } catch (error) {
      res.status(500).json({ error: 'There was an error creating a user' })
    }
  } else res.status(500).json({ error: 'Please add a username and password' })
}

const get = async (req, res) => {
  try {
    const users = await Users.getUsers()
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json(error)
  }
}

const login = async (req, res) => {}

const getJokes = async (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' }
  }

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err })
    })
}
