const express = require('express')
const app = express()

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
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
  
const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})