const Listing = require('../Listing')
const User = require('../User')
const { createListing } = require('../controller/listingUtils')
const { connectDb, disconnectDb } = require('../../database')

const { readFileSync } = require('fs')

function syncReadFile (filename) {
  const contents = readFileSync(filename, 'utf-8')
  const arr = contents.split(/\r?\n/)
  return arr
}

beforeAll(() => {
  connectDb()
})

afterAll(async () => {
  await disconnectDb()
})

describe('Listing functionality', () => {
  let id
  beforeAll(async () => {
    const testUser = new User({
      email: 'ammar@gmail.com',
      username: 'ammarTest',
      password: 'P@ssword'
    })
    id = (await testUser.save()).id
  })

  afterAll(async () => {
    await User.findOneAndRemove({
      email: 'ammar@gmail.com',
      username: 'ammarTest',
      password: 'P@ssword'
    })
    await Listing.findOneAndRemove({
      title: 'test title'
    })
    await Listing.findOneAndRemove({
      title: 'test title 2'
    })
    await Listing.findOneAndRemove({
      title: 'test title 3'
    })
    await Listing.findOneAndRemove({
      title: 'test title 4'
    })
  })
  describe('SQL injection', () => {
    const arr = syncReadFile('/Users/drakeli/Desktop/cisc327/CISC327_20/server/resources/Generic_SQLI.txt')
    it('should not create listing based on price', async () => {
      let listing
      for (let i = 0; i < arr.length(); i++) {
        listing = await createListing('title', 'This is a test description that should work as it is more than 20 chars', arr[i], Date.now(), id)
        expect(listing).toBe(false)
      }
    })
    it('should not create listing based on date', async () => {
      let listing
      for (let i = 0; i < arr.length(); i++) {
        listing = await createListing('title', 'This is a test description that should work as it is more than 20 chars', 100, arr[i], id)
        expect(listing).toBe(false)
      }
    })
    it('should not create listing based on id', async () => {
      let listing
      for (let i = 0; i < arr.length(); i++) {
        listing = await createListing('title', 'This is a test description that should work as it is more than 20 chars', 100, Date.now(), arr[i])
        expect(listing).toBe(false)
      }
    })
  })
})
