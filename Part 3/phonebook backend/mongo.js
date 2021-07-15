const mongoose = require('mongoose');
const process = require('process');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)
};

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.my5yk.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

const phoneSchema = new mongoose.Schema({
name: String,
number: Number,
date: {type: Date, default: Date.now},
});

const Phone = mongoose.model('Phone', phoneSchema);
const name = process.argv[3];
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
 };

