const { response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());

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
];

// Get number of persons and request date
app.get('/info', (request, response) => {
   response.send(`<p>Phonebook has info for ${persons.length} people</p> <br> <p>${new Date()}</p>`);
  
});

// GET all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
});

// Get one person id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    response.json(person)
  } else {
    response.status(404).end(`ID ${id} not found!`)
  };
});

// Delete one person id
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);

  response.status(204).end();
});

// Post a new person
app.post('/api/persons', (request, response) => {
  
  const generateId = (max) => {
const id = persons.length > 0 ? Math.floor(Math.random() * max) : 0;
return id 
  };

  const person = request.body;

  if (!person.name) {
    return response.status(400).json({
      error:'name missing'
    })
  };

  if (!person.number) {
    return response.status(400).json({
    error: 'number missing'
  })
  };

  const personDetail = {
    name: person.name,
    number: person.number,
    date: new Date(),
    id: generateId(100),
  };

  persons = persons.concat(personDetail);
  response.json(personDetail);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);