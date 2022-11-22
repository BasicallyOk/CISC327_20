const { createListing } = require('../controller/listingUtils')
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

describe('create listing functionality', () => {
  const id = '6379af2f0edda1c53b70f27a' // test id linked to khoa@gmail.com

  describe('SQL injection', () => {
    const arr = syncReadFile()
    it('should not create listing based on price', async () => {
      let listing
      for (let i = 0; i < arr.length; i++) {
        listing = await createListing('title', 'This is a test description that should work as it is more than 20 chars', arr[i], Date.now(), id)
        expect(listing).toBe(false)
      }
    })
    it('should not create listing based on date', async () => {
      let listing
      for (let i = 0; i < arr.length; i++) {
        listing = await createListing('title', 'This is a test description that should work as it is more than 20 chars', 100, arr[i], id)
        expect(listing).toBe(false)
      }
    })
    it('should not create listing based on id', async () => {
      let listing
      for (let i = 0; i < arr.length; i++) {
        listing = await createListing('title', 'This is a test description that should work as it is more than 20 chars', 100, Date.now(), arr[i])
        expect(listing).toBe(false)
      }
    })
  })
})
