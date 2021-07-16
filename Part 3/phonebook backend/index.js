
const express = require('express');
const app = express();
require('dotenv').config();
const Phone = require('./models/phone');

const morgan = require('morgan');
morgan.token('body', (req, res) => JSON.stringify(req.body));
// Create morgan token for body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :body '));
const cors = require('cors');
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

// Middleware that print information about every request sent to server
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  next()   // next function yields control to next middleware
};
app.use(requestLogger);

// Mongoose database
/*if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1)
};*/

//const password = process.argv[2];
// Get the input from the console to add to database
/*const name = process.argv[3];
const number = process.argv[4];

const phone = new Phone({
  name: name,
  number: number,
});

if (process.argv.length > 3) {
  phone.save().then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close()
  });
} else {
Phone.find({}).then(contact => {
  console.log('phonebook:');
  contact.map(item => {
      console.log(item.name, item.number);
  });
  mongoose.connection.close()
});
};*/

// Get number of persons and request date
/*app.get('/info', (request, response) => {
   response.send(`<p>Phonebook has info for ${persons.length} people</p> <br> <p>${new Date()}</p>`);
});*/

// GET all persons
app.get('/api/persons', (request, response) => {
  Phone.find({}).then(contact => {
    response.json(contact)
  });
});

// Get one person id
app.get('/api/persons/:id', (request, response) => {
 Phone.findById(request.params.id).then(phone => {
   response.json(phone)
 })
});

// Delete one person id
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);

  response.status(204).end();
});

// Post a new person
app.post('/api/persons', (request, response) => {
  
  const person = request.body;

  if (person.name === undefined) {
    return response.status(400).json({
      error:'name missing'
    })
  };

  if (person.number === undefined) {
    return response.status(400).json({
    error: 'number missing'
  })
  };

    const phone = new Phone({
      name: person.name,
      number: person.number,
      date: new Date(),
    });

   phone.save().then(savedPhone => {
     console.log(savedPhone);
    response.json(savedPhone)
   })
});

// Middleware that catch requests made to non-existing routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
};
app.use(unknownEndpoint);

//  Use the port defined in environment variable PORT or 
// port 3001 if the environment variable PORT is undefined
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
