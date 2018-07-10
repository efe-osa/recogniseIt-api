const profileCtrl =  (req, res, psqldb) => {
  const { id } = req.params

  psqldb.select('*').from('users').where({id })
  .then(user => {
    if (user.length) {
    res.json(user[0])
  } else {
    res.status(400).json("no user found")
  }
  }) 
  .catch(err => 
  res.status(400).json("error getting user"))
}

module.exports = {profileCtrl}