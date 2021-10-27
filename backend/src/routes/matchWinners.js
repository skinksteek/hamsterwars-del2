const express = require('express')
const router = express.Router()

const getMatchWinners = require('../scripts/hamsterScripts').getMatchWinners
const MATCHES = 'matches'
const HAMSTERS = 'hamsters'

router.get('/:id', async (req, res) => {
  let matchWinners = await getMatchWinners(MATCHES, HAMSTERS, req.params.id)
  if (!matchWinners) { // om det inte finns returnera 404
    res.sendStatus(404)
    return
  } 

  res.send(matchWinners)
})


module.exports = router
