const Clarifai = require("clarifai")
const app = new Clarifai.App({
  apiKey: 'fb8c869f19f041b6a3d5deb98e389e38'
})

const apiCall =  (req, res) => app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => res.json(data))
.catch(err => res.status(400).json('unable to work with API'))

const entriesCtrl = (req, res, psqldb) => {
  const { id } = req.body

  psqldb('users').where("id", id)
  .increment("entries", 1)
  .returning('entries')
    .then(entries => { 
     res.json(entries[0])
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {entriesCtrl, apiCall}