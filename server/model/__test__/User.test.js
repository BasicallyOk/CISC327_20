const User = require('../User')
const { login } = require('../utils/userUtils')
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
  afterAll(() => {
    User.findOneAndRemove({ email: 'test@gmail.com' }).then(() => {
        disconnectDb()
    })
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
