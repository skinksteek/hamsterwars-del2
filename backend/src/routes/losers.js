const express = require('express')
const router = express.Router()

const getWinners = require('../scripts/hamsterScripts').getLosers
const HAMSTERS = 'hamsters'

router.get('/', async (req, res) => {
  let hamsters = await getWinners(HAMSTERS)
  res.send(hamsters)

})




module.exports = router
