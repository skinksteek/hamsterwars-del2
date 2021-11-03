// importera paket
const express = require('express');
const app = express();
const path = require('path')

const hamstersRouter = require('./routes/hamsterRoute.js');
const matchesRouter = require('./routes/matchesRoute.js');
const winnersRouter = require('./routes/winners.js');
const losersRouter = require('./routes/losers.js');
const matchWinnersRouter = require('./routes/matchWinners.js');

const cors = require('cors');
// konfigurera 
const PORT = process.env.PORT || 8000


// middleware
app.use( express.static(__dirname + '../../build') )
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body)
  next()
})

// routes / endpoints
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname , '../../build/index.html'))
  console.log(__dirname)
})
app.get('/', (req, res) => {
  console.log('Web root')
  res.send('The server is deployed')
})
app.use('/hamsters', hamstersRouter)
app.use('/matches', matchesRouter)
app.use('/winners', winnersRouter)
app.use('/losers', losersRouter)
app.use('/matchWinners', matchWinnersRouter)

// starta servern
app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})
