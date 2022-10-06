const User = require('../User')
const { login, register } = require('../utils/userUtils')
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
    await disconnectDb()
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
        expect(user.email).toEqual('test@gmail.com')
        expect(user.username).toEqual('testUser')
      })
    })
  })
})

describe("Register functionality", () => {
  beforeAll(() => {
    connectDb()
  })
  afterAll(async () => {
    disconnectDb()
  })
  //it() is the main task, what it should be doing 
  it("should return true if registration is successful", () => {
      register('test@gmail.com', 'P@ssword', 'testregister', '', '', 100).then(status => {
          expect(status).toBe(true)
          User.findOne({email:'test@gmail.com'}).then(user => {
            //expects us to find a user 
            expect(user).not.toBeNull()
            //mongodb automatically creates an ID
            epect(user._id).not.toBeUndefined()
            //removes the user after finding it 
            User.findOneAndRemove({ email: 'test@gmail.com' })
            
          })
      })
  })

  describe("checks email and password is valid", () => {
    it('should not accept an invalid email format (R1-1, R1-3)', () => {
      register('notanemail', 'P@ssword', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      register('notanemail@@gmail.com', 'P@ssword', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      register('a"b(c)d,e:f;g<h>i[j\\k]l@example.com', 'P@ssword', 'testregister', '', '',100).then(status => {
        expect(status).toBe(false)
      })
      register('just"not"right@example.com', 'P@ssword', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      register('this is"not\\allowed@example.com', 'P@ssword', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      register('this\\ still\\"not\\\\allowed@example.com', 'P@ssword', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      register('1234567890123456789012345678901234567890123456789012345678901234+x@example.com', 'P@ssword', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      register('i_like_underscore@but_its_not_allowed_in_this_part.example.com', 'P@ssword', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      register('QA[icon]CHOCOLATE[icon]@test.com', 'P@ssword', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
    })
    it("should return false if password does not meet requirement (R1-4)", () => {
      //fails because of length not being minimum 6
      register('testregister@gmail.com', 'P@ss', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      //fails because of no capital 
      register('testregister@gmail.com', 'p@ssword', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      //fails because no lowercase  
      register('testregister@gmail.com', 'P@SSWORD', 'testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      //fails because no special character 
      register('testregister@gmail.com', 'Password', 'testregister', '', '').then(status => {
        expect(status).toBe(false)
      })
    })
  })
  describe("checks to see if username is valid", () => {
    it("should return false if username does not meet requirement (R1-5, R1-6, R1-7, R1-8, R1-9, R1-10)" , () => {
      //fails because username is empty 
      register('testregister@gmail.com', 'P@ssword', '', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      //fails because username is less than 2 characters 
      register('testregister@gmail.com', 'P@ssword', 'u', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      //fails because username is greater than 20 characters
      register('testregister@gmail.com', 'P@ssword', 'username1234567890123', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      //fails because space is in the prefix
      register('testregister@gmail.com', 'P@ssword', ' testregister', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      //fails because space is in the suffix 
      register('testregister@gmail.com', 'P@ssword', 'testregister ', '', '', 100).then(status => {
        expect(status).toBe(false)
      })
      //fails because email is already been used 
      connectDb()
      // Register the test@gmail.com account
      const existingUser = new User({
        email: 'testregister@gmail.com',
        username: 'testregister',
        password: 'P@sswordregister',
        balance: 100,
        billingAddress: 'address',
        postalCode: 'postalCode'
      })
      testUser.save.then(() => {
        //fails because email is already used in the database 
        register('testregister@gmail.com', 'P@ssword', 'testregister', '', '', 100).then(status => {
          expect(status).toBe(false)
        })
      })
      //fails because shipping address is filled
      register('testregister@gmail.com', 'P@ssword', 'testregister', 'address', '', 100).then(status => {
        expect(status).toBe(false)
      })
      //fails because postal code is filled
      register('testregister@gmail.com', 'P@ssword', 'testregister', '', 'postalCode', 100).then(status => {
        expect(status).toBe(false)
      })
      //fails because balance is not 100
      register('testregister@gmail.com', 'P@ssword', 'testregister ', '', '', 0).then(status => {
        expect(status).toBe(false)
      })
    })
  })
})

