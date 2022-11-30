const { register } = require('../controller/userController')
const { connectDb, disconnectDb } = require('../../database')

async function syncReadFile () {
	const fs = require('fs')
	try {
		// read contents of the file
		const data = fs.readFileSync('././resources/Generic_SQLI.txt', 'UTF-8')

		// split the contents by new line
		const lines = data.split(/\r?\n/)

		return lines
	} catch (err) {
		console.error(err)
	}
}

beforeAll(() => {
	connectDb()
})

afterAll(async () => {
	await disconnectDb()
})

describe('Register functionality', () => {
	describe('SQL injection', () => {
		const arr = syncReadFile()
		it('should not register based on email', async () => {
			let RegisterUser
			for (let i = 0; i < arr.length; i++) {
				RegisterUser = await register(arr[i], 'P@assword', 'testUser1')
				expect(RegisterUser).toBe(false)
			}
		})
		it('should not register based on password', async () => {
			let RegisterUser
			for (let i = 0; i < arr.length; i++) {
				RegisterUser = await register('test@gmail.com', arr[i], 'testUser1')
				expect(RegisterUser).toBe(false)
			}
		})
		it('should not register based on username', async () => {
			let RegisterUser
			for (let i = 0; i < arr.length; i++) {
				RegisterUser = await register('test@gmail.com', 'P@assword', arr[i])
				expect(RegisterUser).toBe(false)
			}
		})
	})
})
