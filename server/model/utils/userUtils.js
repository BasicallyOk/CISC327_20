const User = require('../User')

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

async function listing (id, title, description, price, last_modified_date, owner_id) {
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

module.exports = { login }
