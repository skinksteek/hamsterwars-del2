const database = require('../database.js')
const connect = database.connect
const db = connect()

/* GET ALL HAMSTERS & MATCHES */
async function getAll(collection) {
  const hamstersRef = db.collection(collection)
  const hamstersSnapshot = await hamstersRef.get()

  if (hamstersSnapshot.empty) {
    return []
  }

  const array = []
  await hamstersSnapshot.forEach(async docRef => {
    const data = await docRef.data()
    data.id = docRef.id
    array.push(data)
  })
  return array
}

/* ----------------------------------*/

/* GET /id */
async function getOne(id, collection) {
  const hamsterRef = db.collection(collection).doc(id)
  const hamsterSnapshot = await hamsterRef.get()
  return hamsterSnapshot
}

/* ----------------------------------*/

// POST /hamsters
async function postOne(hamster, collection) {
  const hamsterRef = await db.collection(collection).add(hamster)
  return { id: hamsterRef.id }
}

/* ----------------------------------*/

// PUT /id
async function updateOne(id, object, collection) {
  const docRef = db.collection(collection).doc(id)
  docRef.update(object)
}

/* ----------------------------------*/
// DELETE /hamster/:id
async function deleteOne(hamsterId, collection) {
  const hamsterSnapshot = await db.collection(collection).doc(hamsterId).get()
  if (hamsterSnapshot.exists) {
    await db.collection(collection).doc(hamsterId).delete()
    return true
  } if (!hamsterSnapshot.exists) {
    return false
  }
}

/* ----------------------------------*/
const getRandom = async (collection) => {
  let array = await getAll(collection)
  let random = Math.floor(Math.random() * array.length)
  let randomHamster = array[random];
  return randomHamster
}



/* ----------------------------------*/

// GET CUTEST /hamsters/cutest
const theCutest = async (collection) => { 
  const hamstersRef = db.collection(collection) // Hämtar hamster collection ifrån firebase
  const hamstersSnapshot = await hamstersRef.get()
  if (hamstersSnapshot.empty) {
    return false // om våran collection är tom, returnera false
  }

  const array = [] // skapa en array för collection
  await hamstersSnapshot.forEach(async docRef => { // loopar igenom snapshot för att hämta data om varje hamster 
    const data = await docRef.data()               // och pushar sedan in datan i en array
    data.id = docRef.id
    array.push(data)
  })
  //sorterar i fallande ordning baserat på diff i vinster och förluster
  array.sort((a, b) => {
    let aDiff = a.wins - a.defeats
    let bDiff = b.wins - b.defeats
    return bDiff - aDiff
  })

  let maxScore = array[0].wins - array[0].defeats // högsta score

  let allWinners = array.filter(x => x.wins - x.defeats === maxScore) // Kolla om det finns fler hamstrar med lika bra score

  return allWinners
}


/* ---------------------------------------------------------------- */
/* ---------------------------MATCHES------------------------------ */
/* ---------------------------------------------------------------- */


async function getWinners(collection) {
  const mostWins = await db.collection(collection)
    .orderBy('wins', 'desc')
    .limit(5)
    .get()
  const array = []
  mostWins.forEach(docRef => {
    array.push(docRef.data())
  })
  const winners = [...array]
  return winners

}

async function getLosers(collection) {
  const mostLosses = await db.collection(collection)
    .orderBy('wins', 'asc')
    .limit(5)
    .get()
  const array = []
  mostLosses.forEach(docRef => {
    array.push(docRef.data())
  })
  const losers = [...array]
  return losers

}

async function getMatchWinners(matchesCollection, hamstersCollection, id) {
  let array = []
  const matchesRef = db.collection(matchesCollection); // hämtar alla matcher
  const hamsterRef = db.collection(hamstersCollection).doc(id); // hämtar en särskild hamster med specifikt id
  const matchesSnapshot = await matchesRef.get();
  if (matchesSnapshot.empty) {
    return false
  }
  const hamsterSnapshot = await hamsterRef.get();
  if (hamsterSnapshot.empty) {
    return false
  }
  await matchesSnapshot.forEach(async matchRef => { // loopar igenom alla matcher ifrån firestore
    const match = await matchRef.data(); // hämtar data om match
    if (match.winnerId === id) { // kollar om våran hamster vunnit specifik match
      array.push(match);
    }
  })
  if (array.length > 0) { // om arrayen är större än noll så returnerar vi arrayen med våran hamsters vinster
    return array
  } else {
    return false
  }
}



module.exports = { getAll, getOne, getRandom, postOne, updateOne, deleteOne, theCutest, getWinners, getLosers, getMatchWinners }

