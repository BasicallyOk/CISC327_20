const Listing = require('../Listing')
const User = require('../User')
const { createListing, updateListing } = require('../controller/listingController')
const { connectDb, disconnectDb } = require('../../database')

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
  describe('Input validation', () => {
    it('The title of the product has to be alphanumeric-only, and space allowed only if it is not as prefix and suffix. R4-1', async () => {
      let listing
      listing = await createListing('test title', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', id)
      expect(listing).toBe(true)

      listing = await createListing('this is a test%title', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', id)
      expect(listing).toBe(false)

      listing = await createListing(' this is a test title  ', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', id)
      expect(listing).toBe(false)
    })
    it('The title of the product is no longer than 80 characters. R4-2', async () => {
      let listing
      listing = await createListing('test title 2', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', id)
      expect(listing).toBe(true)
      listing = await createListing('this title should not work as it is more than 80 characters long test test test test', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', id)
      expect(listing).toBe(false)
      listing = await createListing('a', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', id)
      expect(listing).toBe(false)
    })
    it('The description of the product can be arbitrary characters, with a minimum length of 20 characters and a maximum of 2000 characters. R4-3', async () => {
      let listing
      listing = await createListing('test title 3', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', id)
      expect(listing).toBe(true)
      listing = await createListing('test title', 'test', 5000, '2022-03-25', id)
      expect(listing).toBe(false)
      listing = await createListing('abc', 'abcde', 5000, '2022-03-25', id)
      expect(listing).toBe(false)
    })
    it('Description has to be longer than the product title. R4-4', async () => {
      let listing
      listing = await createListing('test title', 'test', 5000, '2022-03-25', id)
      expect(listing).toBe(false)
      listing = await createListing('abc', 'abcde', 5000, '2022-03-25', id)
      expect(listing).toBe(false)
    })
    it('Price has to be of range [10, 10000].. R4-5', async () => {
      let listing
      listing = await createListing('test title', 'This is a test description that should work as it is more than 20 chars', 5, '2022-03-25', id)
      expect(listing).toBe(false)
      listing = await createListing('test title', 'This is a test description that should work as it is more than 20 chars', 500000, '2022-03-25', id)
      expect(listing).toBe(false)
    })
    it('last_modified_date must be after 2021-01-02 and before 2025-01-02. R4-6', async () => {
      let listing
      listing = await createListing('test title', 'This is a test description that should work as it is more than 20 chars', 5000, '2020-03-25', id)
      expect(listing).toBe(false)
      listing = await createListing('test title', 'This is a test description that should work as it is more than 20 chars', 5000, '2027-03-25', id)
      expect(listing).toBe(false)
    })
    it('owner_id cannot be empty. The owner of the corresponding product must exist in the database. R4-7', async () => {
      const testUser = new User({
        email: 'shouldnotexist@gmail.com',
        username: 'shouldnotexist',
        password: 'P@ssword'
      })
      const nonExistentId = (await testUser.save()).id
      // Make sure no user with this id exists
      await User.findByIdAndDelete(nonExistentId)

      let listing = await createListing('test title', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', '')
      expect(listing).toBe(false)
      // 0 should not be a real user id
      listing = await createListing('test title', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', nonExistentId)
      expect(listing).toBe(false)
    })
    it('should create the listing correctly, and should fail if a listing of the same title is created again R4-8', async () => {
      // Register the test@gmail.com account
      let status = await createListing('test title 4', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', id)
      expect(status).toBe(true)
      const listing = Listing.findOne({ title: 'test title', owner_id: id })
      expect(listing).not.toBeUndefined()
      status = await createListing('test title', 'This is a test description that should work as it is more than 20 chars', 5000, '2022-03-25', id)
      expect(status).toBe(false)
      await User.findOneAndRemove({ email: 'ammar@gmail.com' })
    })
  })
})
/*
R5-1: One can update all attributes of the listing, except owner_id and last_modified_date.
R4-5: Price has to be of range [10, 10000].
R5-2: Price can be only increased but cannot be decreased :)
R5-3: last_modified_date should be updated when the update operation is successful.
R5-4: When updating an attribute, one has to make sure that it follows the same requirements as above.
R4-1: The title of the product has to be alphanumeric-only, and space allowed only if it is not as prefix and suffix.
R4-2: The title of the product is no longer than 80 characters.
R4-3: The description of the product can be arbitrary characters, with a minimum length of 20 characters and a maximum of 2000 characters.
R4-4: Description has to be longer than the product's title.
*/
describe('Update functionality', () => {
  let id

  beforeAll(async () => {
    const testUser = new User({
      email: 'ammar@gmail.com',
      username: 'ammarTest',
      password: 'P@ssword'
    })
    id = (await testUser.save()).id

    const listing = new Listing({
      title: 'test listing',
      description: 'abcdefghijklmnopqrstuvwxyz',
      price: 100,
      lastModifiedDate: Date.now(),
      ownerId: id
    })
    listing.save()
  })

  it('should not accept empty title description price', async () => {
    // all empty
    let status
    status = await updateListing('', '', '')
    expect(status).toBe(false)
    // one empty
    status = await updateListing('', 'abcdefghijklmnopqrstuvwxyz', 100)
    status = await updateListing('title', '', 100)
    expect(status).toBe(false)
    status = await updateListing('title', 'abcdefghijklmnopqrstuvwxyz', '')
    expect(status).toBe(false)
    // two empty
    status = await updateListing('', '', 100)
    status = await updateListing('', 'abcdefghijklmnopqrstuvwxyz', '')
    expect(status).toBe(false)
    status = await updateListing('title', '', '')
    expect(status).toBe(false)
  })
  it('should not accept price outside of range R4-5', async () => {
    // under 10
    let status
    status = await updateListing('title', 'abcdefghijklmnopqrstuvwxyz', 9)
    expect(status).toBe(false)
    // over 10000
    status = await updateListing('title', 'abcdefghijklmnopqrstuvwxyz', 10001)
    expect(status).toBe(false)
  })
  it('should not accept price decrease R5-2', async () => {
    const status = await updateListing('test listing', 'abcdefghijklmnopqrstuvwxyz', 99)
    expect(status).toBe(false)
  })
  it('should change last modified date R5-3', async () => {
    const status = await updateListing('test listing', 'abcdefghijklmnopqrstuvwxyz', 100)
    expect(status).toBe(true)
  })
  it('should not accept title to have non-alphanumeric characters R4-1', async () => {
    const status = await updateListing('!@#$%^&*', 'abcdefghijklmnopqrstuvwxyz', 100)
    expect(status).toBe(false)
  })
  it('should not accept title to have spaces for prefix and suffix R4-1', async () => {
    let status
    status = await updateListing(' title', 'abcdefghijklmnopqrstuvwxyz', 100)
    expect(status).toBe(false)
    status = await updateListing('title ', 'abcdefghijklmnopqrstuvwxyz', 100)
    expect(status).toBe(false)
    status = await updateListing('test listing', 'abcdefghijklmnopqrstuvwxyz', 200)
    expect(status).toBe(true)
  })
  it('should not accept title out of range R4-2', async () => {
    const status = await updateListing('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 100)
    expect(status).toBe(false)
  })
  it('should not accept description under 20 characters or over 2000 characters R4-3', async () => {
    let status = await updateListing('temp title', 'too short', 100) // shorter than title
    expect(status).toBe(false)
    status = await updateListing('temp title', 'still too short', 100) // shorter than 20
    expect(status).toBe(false)
    status = await updateListing('temp title', Array(2002).join('a'), 100)
    expect(status).toBe(false)
  })
  it('should not accept description oustide of range R4-3', async () => {
    let status
    status = await updateListing('title', 'abcdefghi', 100)
    expect(status).toBe(false)
    let d
    for (let i = 0; i < 20001; i++) {
      d = d + 'a'
    }
    status = await updateListing('title', d, 100)
    expect(status).toBe(false)
  })
  it('should not accept description length less than title R4-', async () => {
    const status = await updateListing('titletitletitletitletitletitletitletitletitletitletitletitle', 'abcdefghijklmnopqrstuvwxyz', 100)
    expect(status).toBe(false)
  })

  afterAll(async () => {
    await User.findOneAndRemove({
      email: 'ammar@gmail.com',
      username: 'ammarTest',
      password: 'P@ssword'
    })
    await Listing.findOneAndRemove({
      title: 'temp title'
    })
    await Listing.findOneAndRemove({
      title: 'test listing'
    })
  }, 5000)
})
