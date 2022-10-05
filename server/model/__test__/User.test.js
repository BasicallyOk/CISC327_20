const User = require('../User')
const {login} = require('../utils/userUtils')

describe('Login functionality', () => {
    // Set up testing
    beforeAll(() => {
        // Register the test@gmail.com account
        // Make sure non-existent@gmail.com does not exist
    })

    describe('Input validation', () => {
        it('should not accept empty email and password', () => {
            let user = login('', '')
            expect(user).toBeNull()
        })
        it('should not accept empty email', () => {
            let user = login('', '1234')
            expect(user).toBeNull()
        })
        it('should not accept empty password', () => {
            let user = login('', '1234')
            expect(user).toBeNull()
        })
        it('should not accept an invalid email format', () => {
            expect(login('notanemail', 'password')).toBeNull()
            expect(login('notanemail@@gmail.com', 'password')).toBeNull()
            expect(login())
        })
        it('should not log into a user that does not exist', () => {
            let user = login('non-existent@gmail.com', 'password')
        })
    })

    describe('Logging into the database', () => {
        afterAll(() => {
            // delete test@gmail.com user
        })
        it('should return the correct user object', () => {
            let user = login('test@gmail.com', 'password')
            expect(user.username).toBeEqual('test@gmail.com')
        })
    })
    
})
