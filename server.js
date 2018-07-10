const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require("knex")
const register = require("./controllers/register")
const login = require("./controllers/signin")
const profile = require("./controllers/profile")
const entries = require("./controllers/entries")
const psqldb = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'osawaru95',
    database : 'brain-api'
  }
})

app.use(bodyparser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(psqldb.users)
})

app.post("/Signin", (req, res) => {login.loginCtrl(req, res, psqldb, bcrypt)} )

app.post("/Signup",(req, res) => {register.registerCtrl(req, res, psqldb, bcrypt)} )

app.get("/profile/:id", (req, res) => {profile.profileCtrl(req, res, psqldb)} )

app.put("/image", (req, res) => {entries.entriesCtrl(req, res, psqldb)} )
app.post("/imageurl", (req, res) => {entries.apiCall(req, res)} )
  

app.listen(3000, () => console.log("running on port 3000"))