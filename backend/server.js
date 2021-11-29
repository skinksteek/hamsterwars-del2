// importera paket
const express = require('express');
const app = express();
const cors = require('cors');
const hamstersRouter = require('./routes/hamsterRoute.js');
const matchesRouter = require('./routes/matchesRoute.js');
const winnersRouter = require('./routes/winners.js');
const losersRouter = require('./routes/losers.js');
const matchWinnersRouter = require('./routes/matchWinners.js');
const path = require('path');


// konfigurera app
const PORT = process.env.PORT || 8000

// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body)
  next()
})

// statiska filer
app.use('/img', express.static(__dirname+'/hamsters')) 
app.use('/', express.static(__dirname+'/../build')) 


// routes / endpoints
app.use('/hamsters', hamstersRouter)
app.use('/matches', matchesRouter)
app.use('/winners', winnersRouter)
app.use('/losers', losersRouter)
app.use('/matchWinners', matchWinnersRouter)

app.get('*', (req, res) => {
	res.sendFile(path.resolve('/../build/index.html'))
})


// starta servern
app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})
