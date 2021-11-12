const express = require('express')
const router = express.Router()

const { getAll, getOne, postOne, deleteOne, getMatchWinners} = require('../scripts/hamsterScripts')
const isMatches = require('../validator/validation.js').isMatches
const MATCHES = 'matches'

router.get('/', async (req, res) => {
  let allMatches = await getAll(MATCHES)
  if (allMatches) {
    res.send(allMatches)
  } else {
    res.sendStatus(404)
  }
})



router.get('/:id', async (req, res) => {
  const matchesId = await getOne(req.params.id, MATCHES)
  if (matchesId.exists) {
    const match = await matchesId.data()
    res.status(200).send(match)
  } if (!matchesId.exists) {
    res.sendStatus(404)
  }
});

router.post('/', async (req, res) => {
  if (!isMatches(req.body)) {
    res.sendStatus(400)
    return
  }
  let hamsterObject = await postOne(req.body, MATCHES)
  res.status(200).send(hamsterObject)
})

router.delete('/:id', async (req, res) => {
  const matchSnapshot = await deleteOne(req.params.id, MATCHES)
  if (matchSnapshot) {
    res.sendStatus(200)
    return
  } else {
    res.sendStatus(404)
  }
})


module.exports = router
