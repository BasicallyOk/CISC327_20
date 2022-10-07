const User = require('../User')
const { login } = require('../utils/userUtils')
const { update } = require('../utils/userUtils')
const { connectDb, disconnectDb } = require('../../database')

describe('Login functionality', () => {
  // Set up testing
  beforeAll(() => {
    connectDb()
    // Register the test@gmail.com account
    const testUser = new User({
      email: 'test@gmail.com',
      username: 'testUser',
      password: 'password',
      balance: 100,
      billingAddress: 'address',
      postalCode: 'postalCode'
    })
    testUser.save()
  })
  afterAll(async () => {
    await User.findOneAndRemove({ email: 'test@gmail.com' })
    disconnectDb()
  })

  describe('Input validation', () => {
    it('should not accept empty email and password', () => {
      login('', '').then(user => {
        expect(user).toBeNull()
      })
    })
    it('should not accept empty email', () => {
      login('', '1234').then(user => {
        expect(user).toBeNull()
      })
    })
    it('should not accept empty password', () => {
      login('test@gmail.com', '').then(user => {
        expect(user).toBeNull()
      })
    })
    it('should not accept an invalid email format', () => {
      login('notanemail', 'password').then(user => {
        expect(user).toBeNull()
      })
      login('notanemail@@gmail.com', 'password').then(user => {
        expect(user).toBeNull()
      })
      login('a"b(c)d,e:f;g<h>i[j\\k]l@example.com', 'password').then(user => {
        expect(user).toBeNull()
      })
      login('just"not"right@example.com', 'password').then(user => {
        expect(user).toBeNull()
      })
      login('this is"not\\allowed@example.com', 'password').then(user => {
        expect(user).toBeNull()
      })
      login('this\\ still\\"not\\\\allowed@example.com', 'password').then(user => {
        expect(user).toBeNull()
      })
      login('1234567890123456789012345678901234567890123456789012345678901234+x@example.com', 'password').then(user => {
        expect(user).toBeNull()
      })
      login('i_like_underscore@but_its_not_allowed_in_this_part.example.com', 'password').then(user => {
        expect(user).toBeNull()
      })
      login('QA[icon]CHOCOLATE[icon]@test.com', 'password').then(user => {
        expect(user).toBeNull()
      })
    })
    it('should not log into a user that does not exist', () => {
      // In a perfect world, the testing db used in CI will not have this
      login('non-existent@gmail.com', 'password').then(user => {
        expect(user).toBeNull()
      })
    })
  })

  describe('Logging into the database', () => {
    it('should return the correct user object', () => {
      login('test@gmail.com', 'password').then(user => {
        expect(user).not.toBeNull()
        expect(user.email).toBeEqual('test@gmail.com')
        expect(user.username).toBeEqual('testUser')
      })
    })
  })
})

// testinf for update user profile
describe('Update user profile functionality', () => {
  // Set up testing
  beforeAll(() => {
    connectDb()
    // Register the test@gmail.com account
    const testUser = new User({
      email: 'test@gmail.com',
      username: 'testUser',
      password: 'password',
      balance: 100,
      billingAddress: 'address',
      postalCode: 'A1B 2C3'
    })
    testUser.save()
  })
  afterAll(async () => {
    await User.findOneAndRemove({ email: 'test@gmail.com' })
    disconnectDb()
  })

  // testing for invalid inputs
  describe('Input validation', () => {
    // testing for empty parameters
    it('should not accept empty username, email, billingAddress and postalCode', () => {
      // all empty
      update('', '', '', '').then(user => {
        expect(user).toBeNull()
      })
      // one empty
      update('', 'test@gmail.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', '', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'test@gmail.com', '', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'test@gmail.com', 'address', '').then(user => {
        expect(user).toBeNull()
      })
      // two empty
      update('', '', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('', 'test@gmail.com', '', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('', 'test@gmail.com', 'address', '').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', '', '', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', '', 'address', '').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'test@gmail.com', '', '').then(user => {
        expect(user).toBeNull()
      })
      // three empty
      update('testUser', '', '', '').then(user => {
        expect(user).toBeNull()
      })
      update('', 'test@gmail.com', '', '').then(user => {
        expect(user).toBeNull()
      })
      update('', '', 'address', '').then(user => {
        expect(user).toBeNull()
      })
      update('', 'test@gmail.com', '', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
    })
    // testing for invalid username
    it('should not accept an invalid username format', () => {
      update('a', 'test@gmail.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('ab', 'test@gmail.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('abcdefghijklmnopqrst+x', 'test@gmail.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
    })
    // testing for invalid email
    it('should not accept an invalid email format', () => {
      update('testUser', 'notanemail', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'notanemail@@gmail.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'a"b(c)d,e:f;g<h>i[j\\k]l@example.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'just"not"right@example.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'this is"not\\allowed@example.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'this\\ still\\"not\\\\allowed@example.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', '1234567890123456789012345678901234567890123456789012345678901234+x@example.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'i_like_underscore@but_its_not_allowed_in_this_part.example.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'QA[icon]CHOCOLATE[icon]@test.com', 'address', 'A1B 2C3').then(user => {
        expect(user).toBeNull()
      })
    })
    // testing for invalid postalCode
    it('should not accept an invalid username format', () => {
      update('testUser', 'test@gmail.com', 'address', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'test@gmail.com', 'address', '0123456789').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'test@gmail.com', 'address', '!@#$%^&*()-_=+[]{};:,<>./?').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'test@gmail.com', 'address', 'ABC DEF').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'test@gmail.com', 'address', '123 456').then(user => {
        expect(user).toBeNull()
      })
      update('testUser', 'test@gmail.com', 'address', '1A2 B3C').then(user => {
        expect(user).toBeNull()
      })
    })
    it('should not update a user that does not exist', () => {
      // In a perfect world, the testing db used in CI will not have this
      update('non-existent-username', 'non-existent@gmail.com', 'non-existent-billing-address', 'non-existent-postal-code').then(user => {
        expect(user).toBeNull()
      })
    })
  })
})