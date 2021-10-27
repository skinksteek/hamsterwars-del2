const express = require('express')
const router = express.Router()

const { isHamsterObject, isHamsterCute } = require('../validator/validation.js')
const { getAll, getOne, getRandom, postOne, updateOne, deleteOne, theCutest } = require('../scripts/hamsterScripts')

const HAMSTERS = 'hamsters'

//GET ALL
//          /hamsters
router.get('/', async (req, res) => {
  let allHamsters = await getAll(HAMSTERS)
  if (allHamsters) {
    res.send(allHamsters)
  } else {
    res.sendStatus(404)
  }
})

// -------------------------------




// //GET /hamsters/cutest
router.get('/cutest', async (req, res) => {
  let cutest = await theCutest(HAMSTERS)
  if (cutest) {
    res.status(200).send(cutest)
} else {
    res.sendStatus(404)
}
})

// // -------------------------------

//GET Random /hamsters/random
router.get('/random', async (req, res) => {
  let hamster = await getRandom(HAMSTERS)
    if (hamster) {
        res.send(hamster)
    } else {
        res.sendStatus(404)
    }
})

// -------------------------------



//GET / id
router.get('/:id', async (req, res) => {
  const hamsterId = await getOne(req.params.id, HAMSTERS)
  if (hamsterId.exists) {
    const hamster = await hamsterId.data()
    res.status(200).send(hamster)
  } if (!hamsterId.exists) {
    res.sendStatus(404)
  }
});


// -------------------------------

// POST /hamster
router.post('/', async (req, res) => {
  if (!isHamsterObject(req.body)) {
    res.sendStatus(400)
    return
  }
  let hamsterObject = await postOne(req.body, HAMSTERS)
  res.status(200).send(hamsterObject)
})



// -------------------------------

//DELETE /hamster/:id
router.delete('/:id', async (req, res) => {
  const hamsterSnapshot = await deleteOne(req.params.id, HAMSTERS)
  if (hamsterSnapshot) {
    res.sendStatus(200)
    return
  } else {
    res.sendStatus(404)
  }
})


// // -------------------------------

// //PUT       /id
router.put('/:id', async (req, res) => {
  let hamsterExists = await getOne(req.params.id, HAMSTERS)
  if (!hamsterExists.exists) {
    res.sendStatus(404)
    return
  }
  const hamsterBody = req.body
  if (!isHamsterCute(hamsterBody)) {
    res.sendStatus(400)
    return
  } else {
    await updateOne(req.params.id, hamsterBody, HAMSTERS)
    res.sendStatus(200)
  }
})




module.exports = router
