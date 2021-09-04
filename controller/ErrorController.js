const {verboseErrors, genericError} = require('../config')

module.exports = {
    generateError: (err) => {
        if (verboseErrors) {
            return genericError
        } else {
            return {error: err}
        }
    }
}