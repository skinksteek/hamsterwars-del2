const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

clear();

async function clear() {
  const hamstersRef = db.collection(HAMSTERS)
  const hamstersSnapshot = await hamstersRef.get()

  if(hamstersSnapshot.empty ) {
    return
  }

  hamstersSnapshot.forEach(hamsterRef => {
    hamstersRef.doc(hamsterRef.id).delete()
    // Vi behöver inte await - inget att vänta på
  })
}
