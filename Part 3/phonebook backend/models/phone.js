const mongoose = require('mongoose');
const process = require('process');

const url = process.env.MONGODB_URI

console.log('connecting to', url);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
.then(result => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting to MongDB:', error.message)
});

const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number,
    date: {type: Date, default: Date.now},
    });

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
});

module.exports = mongoose.model('Phone', phoneSchema);