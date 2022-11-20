const Listing = require('../Listing')
const User = require('../User')
const { createListing } = require('../controller/listingUtils')
const { connectDb, disconnectDb } = require('../../database')

function syncReadFile () {
  let arr = [];
  const f = require('fs');
  const readline = require('readline');
  var user_file = '../../resources/Generic_SQLI.txt';
  var r = readline.createInterface({
    input : f.createReadStream(user_file)
  });
  r.on('line', function (text) {
    arr.push(text);
  });
  return arr
}

beforeAll(() => {
  connectDb()
})

afterAll(async () => {
  await disconnectDb()
})

describe('create listing functionality', () => {
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
