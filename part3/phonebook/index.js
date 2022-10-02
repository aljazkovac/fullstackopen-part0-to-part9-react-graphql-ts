// *** THE SETUP ***
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const password = process.argv[2]
const mongoose = require('mongoose')
const url = `mongodb+srv://aljaz:${password}@cluster0.l8aozni.mongodb.net/phonebookApp?retryWrites=true&w=majority`
const entrySchema = new mongoose.Schema({
  name: String,
  number: Number,
})
const Entry = mongoose.model('Entry', entrySchema)
app.use(cors())
app.use(express.static('build'))
morgan.token('data', (req) => JSON.stringify(req.body))
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())

 // *** THE METHODS ***
 //#region Methods
app.get('/api/persons', (req, res) => {
    mongoose
        .connect(url)
        .then(result => {
            console.log("connected to MongoDB")
            Entry
              .find({})
              .then(entries => {
                  res.json(entries)
                  mongoose.connection.close()
                  console.log("connection to MongoDB closed")
              })
        })
        .catch((error) => {
            console.log("error connecting to MongoDB: ", error.message)
        })
})

app.get('/api/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people.<p>
            <p>${date.toString()}<p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })

function generateRandomId() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).json({ 
        error: 'name missing' 
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'person already in phonebook'
        })
    }
    const person = {
        id: generateRandomId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
//#endregion