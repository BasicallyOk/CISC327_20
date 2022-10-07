const User = require('../User')

/**
 * Validate username using R3-4
 * @param {String} username 
 * @returns
 */
const validateUserName = (username) => {
  return String(username)
    .match(/^[a-zA-Z0-9][a-zA-Z0-9 ]+[a-zA-Z0-9]$/i)
}
/**
 * Validate email using the rfc5322 standard
 * @param {String} email
 * @returns
 */
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^[-a-z0-9~!$%^&*=+}{'?]+(\.[-a-z0-9~!$%^&*=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    )
}
/**
 * Validate billingAddress using number, street name, extension
 * @param {String} billingAddress 
 * @returns 
 */
const validateBillingAddress = (billingAddress) => {
  return String(billingAddress)
    .match(/^\d+ [ ]? [a-zA-Z]+ []? [a-zA-Z]+$/i)
}
/**
 * Validate postalCode using R3-2 and R3-3
 * @param {String} postalCode 
 * @returns 
 */
const validatePostalCode = (postalCode) => {
  return String(postalCode)
    .toUpperCase()
    .match(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] [ ]?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i)
}

/**
 * Log in to a user profile
 * @param {String} email the email address associated with the user
 * @param {String} password the password string to sign in
 * @return {Object} true if the login operation succeeded and false if otherwise
 */
async function login (email, password) {
  // Validate if input is empty
  if (email === '' || password === '') {
    return null
  }
  // Check if local part is longer than 64. Regex cant test this
  if (email.split('@')[0].length > 64) {
    return null
  }
  if (!validateEmail(email)) {
    return null
  }

  await User.findOne({ email }).then(user => {
    if (user) {
      if (user.password === password) {
        return user
      }
    } else {
      // User does not exist
      return null
    }
  })
}
// write user update pofile function async
async function update (username, email, billingAddress, postalCode) {
  // Validate if input is empty
  if (username === '' || email === '' || billingAddress === '' || postalCode == '') {
    return null
  }
  // Check if username is valid
  if (username.length <= 2 || username.length >=20) {
    return null
  }
  if (!validateUserName(username)) {
    return null
  }
  // Check if local part is longer than 64. Regex cant test this
  if (email.split('@')[0].length > 64) {
    return null
  }
  if (!validateEmail(email)) {
    return null
  }
  // Ckeck if billingAddress is valid
  if (billingAddress.split(' ').length != 3) {
    return null
  }
  if (!validateBillingAddress) {
    return null
  }
  // Check if postalCode is valid
  if (postalCode.split(' ').length != 2) {
    return null
  }
  if (!validatePostalCode) {
    return null
  }
}
module.exports = { login, update }
