const User = require('../User')

/**
 * Log in to a user profile
 * @param {String} email the email address associated with the user 
 * @param {String} password the password string to sign in
 * @return {Object} true if the login operation succeeded and false if otherwise
 */
function login(email, password) {
    // Validate input
    if (email === '' || password === '') {
        return null
    }
    
    return user
}

module.exports = {login}