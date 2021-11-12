const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

const data = require('../data.json')

populate();

// fill the collection with "test" data
async function populate() {
  data.forEach(object => {
    let newObject = { 
      ...object
      }
      db.collection(HAMSTERS).add(newObject)
  })
}
