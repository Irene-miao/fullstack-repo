// info print normal log messages
// error print all error messages

const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, 
    error
}