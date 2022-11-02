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
  // Validate if input is empty
  if (email === '') {
    return false
  }
  // Check if local part is longer than 64. Regex cant test this
  if (email.split('@')[0].length > 64) {
    return false
  }
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
  if (billingAddress.split(' ').length !== 3) {
    return false
  }
  return String(billingAddress)
    .match(/^\d+ [ ]? [a-zA-Z]+ [ ]? [a-zA-Z]+$/i)
}
/**
 * Validate postalCode using R3-2 and R3-3
 * @param {String} postalCode
 * @returns
 */
const validatePostalCode = (postalCode) => {
  if (postalCode.split(' ').length !== 2) {
    return false
  }
  return String(postalCode)
    .match(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] [ ]?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i)
}
/**
 * Validates password for registration
 * @param {String} password
 */
const validatePassword = (password) => {
  // if password has length shorter than 6 then return false
  if (password.length < 6) {
    return false
  }

  // if password is all uppercase then return false
  if (password.toUpperCase() === password) {
    return false
  }

  // if password is all lowercase then return false
  if (password.toLowerCase() === password) {
    return false
  }

  // checks if they are all alphanuermic and if there are special characters
  if (!password.match(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,80}$/)) {
    return false
  }
  return true
}

/**
 * Validate Username for registration
 * @param {String} username
 * @returns {Boolean} true if it passes and false if it doesn't
 */
const validateUsername = (username) => {
  // return false if username is less than 2 characters and greater than 20
  if (username.length < 2 || username.length > 20) {
    return false
  }

  // return false if username contains anything otherthan alphanumeric values
  if (!username.match(/^[0-9a-zA-Z]+$/)) {
    return false
  }

  // return false if username has a space in either prefix or suffix
  if (username.startsWith(' ') || username.endsWith(' ')) {
    return false
  }
  return true
}

/**
 * Log in to a user profile
 * @param {String} email the email address associated with the user
 * @param {String} password the password string to sign in
 * @return {Object} true if the login operation succeeded and false if otherwise
 */
async function login (email, password) {
  if (password === '') {
    console.log('Password is empty')
    return null
  }

  if (!validatePassword(password)) {
    console.log('Password does not satisfy requirements')
    return null
  }

  if (!validateEmail(email)) {
    console.log('Email does not satisfy requirements')
    return null
  }

  const user = await User.findOne({ email })
  if (user) {
    if (user.password === password) {
      return user
    } else { // Wrong password
      console.log('Wrong password')
      return null
    }
  } else {
    console.log(`User ${email} does not exist`)
    // User does not exist
    return null
  }
}

/**
 *
 * @param {String} email email used for registration
 * @param {String} password password for the user
 * @param {String} username username for the user
 * @param {String} billingAddress billing address for the user
 * @param {String} postalCode postal code of user
 * @param {Number} balance the balance for the user (set at 100 as signup bonus)
 */
async function register (email, password, username) {
  // makes sure that the email is valid when registrating
  if (!validateEmail(email)) {
    console.log('Email does not satisfy requirements')
    return false
  }

  // make sure that the password meets the requirments
  if (!validatePassword(password)) {
    console.log('Password does not satisfy requirements')
    return false
  }

  // make sure that the username meets the requirements
  if (!validateUsername(username)) {
    console.log('Username does not satisfy requirements')
    return false
  }
  // looks through the database if the email has been used then return false
  const user = await User.findOne({ email })
  if (user) {
    console.log(`User ${email} already exists`)
    return false
  }

  // create the user
  const newUser = new User({
    email,
    password,
    username
  })
  // save user to database
  await newUser.save()
  return true
}

// write user update pofile function async
async function update (username, email, billingAddress, postalCode) {
  // Validate if input is empty
  if (username === '' || email === '' || billingAddress === '' || postalCode === '') {
    return false
  }
  // Check if username is valid
  if (!validateUserName(username)) {
    console.log('Username does not satisfy requirements')
    return false
  }
  // Check if local part is longer than 64. Regex cant test this
  if (!validateEmail(email)) {
    console.log('Email does not satisfy requirements')
    return false
  }
  // Ckeck if billingAddress is valid
  if (!validateBillingAddress(billingAddress)) {
    console.log('Billing Address does not satisfy requirements')
    return false
  }
  // Check if postalCode is valid
  if (!validatePostalCode(postalCode)) {
    console.log('Postal Code does not satisfy requirements')
    return false
  }
  // updates user to database
  await User.updateOne()
  return true
}

module.exports = { login, register, update }
