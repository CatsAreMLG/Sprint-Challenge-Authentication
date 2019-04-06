const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const configureRoutes = require('../config/routes.js')

const server = express()

const sessionOptions = {
  name: 'shrimp',
  secret: 'not a secret',
  cookie: {
    maxAge: 1000 * 60 * 60, // hour
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require('../database/dbConfig'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60 //hour
  })
}

var corsOptions = {
  origin: 'http://localhost:3000'
}

server.use(session(sessionOptions))
server.use(helmet())
server.use(cors(corsOptions))
server.use(express.json())

configureRoutes(server)

module.exports = server
