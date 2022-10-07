const User = require('../User')
const { login, register } = require('../utils/userUtils')
const { connectDb } = require('../../database')

beforeAll(async () => {
  await connectDb()
})

describe('Login functionality', () => {
  describe('Input validation', () => {
    it('should not accept empty email and password R1-1', async () => {
      let user = await login('', '')
      expect(user).toBeNull()
    })
    it('should not accept empty email R1-1', async () => {
      let user = await login('', '1234')
      expect(user).toBeNull()
    })
    it('should not accept empty password R1-2', async () => {
      let user = await login('test@gmail.com', '')
      expect(user).toBeNull()
    })
    it('should not accept an invalid email format R1-3', async () => {
      let user = await login('notanemail', 'password')
      expect(user).toBeNull()

      user = await login('notanemail@@gmail.com', 'password')
      expect(user).toBeNull()
      
      user = await login('a"b(c)d,e:f;g<h>i[j\\k]l@example.com', 'password')
      expect(user).toBeNull()
      
      user = await login('just"not"right@example.com', 'password')
      expect(user).toBeNull()
      
      user = await login('this is"not\\allowed@example.com', 'password')
      expect(user).toBeNull()
      
      user = await login('this\\ still\\"not\\\\allowed@example.com', 'password')
      expect(user).toBeNull()
      
      user = await login('1234567890123456789012345678901234567890123456789012345678901234+x@example.com', 'password')
      expect(user).toBeNull()
      
      user = await login('i_like_underscore@but_its_not_allowed_in_this_part.example.com', 'password')
      expect(user).toBeNull()
      
      user = await login('QA[icon]CHOCOLATE[icon]@test.com', 'password')
      expect(user).toBeNull()
      
    })
    it('should return null if password does not meet requirement R1-4', async () => {
      let user
      // fails because of length not being minimum 6
      user = await login('testregister@gmail.com', 'P@ss')
      expect(user).toBeNull()
      
      // fails because of no capital
      user = await login('testregister@gmail.com', 'p@ssword')
      expect(user).toBeNull()
      
      // fails because no lowercase
      user = await login('testregister@gmail.com', 'P@SSWORD')
      expect(user).toBeNull()
      
      // fails because no special character
      user = await login('testregister@gmail.com', 'Password')
      expect(user).toBeNull()
      
    })
    it('should not log into a user that does not exist', async () => {
      // In a perfect world, the testing db used in CI will not have this
      let user = await login('non-existent@gmail.com', 'password')
      expect(user).toBeNull()
    })
  })

  describe('Logging into the database', () => {
    it('should return the correct user object R2-1', async () => {
      // Register the test@gmail.com account
      const testUser = new User({
        email: 'test@gmail.com',
        username: 'testRegister',
        password: 'P@ssword'
      })
      await testUser.save()
      let user = await login('test@gmail.com', 'P@ssword')
      expect(user).not.toBeNull()
      expect(user.email).toEqual('test@gmail.com')
      expect(user.username).toEqual('testRegister')
      await User.findOneAndRemove({ email: 'test@gmail.com' })
    })
  })
})

describe('Register functionality', () => {
  // it() is the main task, what it should be doing
  it('should return true if registration is successful (R1-10)', async () => {
    let status = await register('test@gmail.com', 'P@ssword', 'testregister')
    expect(status).toBe(true)
    let user = await User.findOne({ email: 'test@gmail.com' })
    // expects us to find a user
    // mongodb automatically creates an ID
    expect(user._id).not.toBeUndefined()
    // expect balance to always be 100 after registration
    expect(user.balance).toBe(100)
    // removes the user after finding it
    await User.findOneAndRemove({ email: 'test@gmail.com' })
  })

  describe('checks email and password is valid', () => {
    it('should not accept an invalid email format (R1-1, R1-3)', async () => {
      let status
      status = await register('notanemail', 'P@ssword', 'testfail')
      expect(status).toBe(false)

      status = await register('notanemail@@gmail.com', 'P@ssword', 'testfail')
      expect(status).toBe(false)
  
      status = await register('a"b(c)d,e:f;g<h>i[j\\k]l@example.com', 'P@ssword', 'testfail')
      expect(status).toBe(false)
  
      status = await register('just"not"right@example.com', 'P@ssword', 'testfail')
      expect(status).toBe(false)
  
      status = await register('this is"not\\allowed@example.com', 'P@ssword', 'testfail')
      expect(status).toBe(false)
  
      status = await register('this\\ still\\"not\\\\allowed@example.com', 'P@ssword', 'testfail')
      expect(status).toBe(false)
  
      status = await register('1234567890123456789012345678901234567890123456789012345678901234+x@example.com', 'P@ssword', 'testfail')
      expect(status).toBe(false)
  
      status = await register('i_like_underscore@but_its_not_allowed_in_this_part.example.com', 'P@ssword', 'testfail')
      expect(status).toBe(false)
  
      status = await register('QA[icon]CHOCOLATE[icon]@test.com', 'P@ssword', 'testfail')
      expect(status).toBe(false)
  
    })
    it('should return false if password does not meet requirement (R1-4)', async () => {
      let status
      // fails because of length not being minimum 6
      status = await register('testfail@gmail.com', 'P@ss', 'testfail')
      expect(status).toBe(false)
      
      // fails because of no capital
      status = await register('testfail@gmail.com', 'p@ssword', 'testfail')
      expect(status).toBe(false)
      
      // fails because no lowercase
      status = await register('testfail@gmail.com', 'P@SSWORD', 'testfail')
      expect(status).toBe(false)
      
      // fails because no special character
      status = await register('testfail@gmail.com', 'Password', 'testfail')
      expect(status).toBe(false)
      
    })
  })
  describe('checks to see if username is valid', () => {
    it('should return false if username does not meet requirement (R1-5, R1-6, R1-8, R1-9)', async () => {
      let status
      // fails because username is empty
      status = await register('testfail@gmail.com', 'P@ssword', '')
      expect(status).toBe(false)

      // fails because username is less than 2 characters
      status = await register('testfail@gmail.com', 'P@ssword', 'u')
      expect(status).toBe(false)

      // fails because username is greater than 20 characters
      status = await register('testfail@gmail.com', 'P@ssword', 'username1234567890123')
      expect(status).toBe(false)

      // fails because space is in the prefix
      status = await register('testfail@gmail.com', 'P@ssword', ' testfail')
      expect(status).toBe(false)

      // fails because space is in the suffix
      status = await register('testfail@gmail.com', 'P@ssword', 'testfail ')
      expect(status).toBe(false)
    })
    it('should return false if user already exists R1-7', async () => {
      // Register the test@gmail.com account
      const existingUser = new User({
        email: 'testregister@gmail.com',
        username: 'testregister',
        password: 'P@sswordregister',
        balance: 100,
      })
      await existingUser.save()
        // fails because email is already used in the database
      let status = await register('testregister@gmail.com', 'P@ssword', 'testregister')
      expect(status).toBe(false)
      await User.findOneAndRemove({ email: 'test@gmail.com' })
    })
  })
})
