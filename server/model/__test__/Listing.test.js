const Listing = require('../Listing')
const User = require('../User')
const { createListing } = require('../utils/listingUtils')
const { login, register } = require('../utils/userUtils')
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
		await testUser.save()
		id = await User.findOne({
			email: 'ammar@gmail.com',
			username: 'ammarTest'
		})._id
	})

	afterAll(async () => {
		await User.findOneAndRemove({
			email: 'ammar@gmail.com',
			username: 'ammarTest',
			password: 'P@ssword'
		})
	})
    describe('Input validation', () => {
      it('The title of the product has to be alphanumeric-only, and space allowed only if it is not as prefix and suffix. R4-1', async () => {
        let listing
        listing = await createListing("test title", "This is a test description that should work as it is more than 20 chars", 5000, "2022-03-25", id)
        expect(listing).toBe(true)

        listing = await createListing("this is a test%title", "This is a test description that should work as it is more than 20 chars", 5000, "2022-03-25", id)
        expect(listing).toBe(false)

        listing = await createListing(" this is a test title  ", "This is a test description that should work as it is more than 20 chars", 5000, "2022-03-25", id)
        expect(listing).toBe(false)
      })
      it('The title of the product is no longer than 80 characters. R4-2', async () => {
        let listing
        listing = await createListing("test title", "This is a test description that should work as it is more than 20 chars", 5000, "2022-03-25", id)
        expect(listing).toBe(true)
        listing = await createListing("this title should not work as it is more than 80 characters long test test test test", "This is a test description that should work as it is more than 20 chars", 5000, "2022-03-25", id)
        expect(listing).toBe(false)
        listing = await createListing("a", "This is a test description that should work as it is more than 20 chars", 5000, "2022-03-25", id)
        expect(listing).toBe(false)
      })
      it('The description of the product can be arbitrary characters, with a minimum length of 20 characters and a maximum of 2000 characters. R4-3', async () => {
        let listing
        listing = await createListing("test title", "This is a test description that should work as it is more than 20 chars", 5000, "2022-03-25", id)
        expect(listing).toBe(true)
        listing = await createListing("test title", "test", 5000, "2022-03-25", id)
        expect(listing).toBe(false)
        listing = await createListing("abc", "abcde", 5000, "2022-03-25", id)
        expect(listing).toBe(false)
      })
      it('Description has to be longer than the product title. R4-4', async () => {
        let listing
        listing = await createListing("test title", "test", 5000, "2022-03-25", id)
        expect(listing).toBe(false)
        listing = await createListing("abc", "abcde", 5000, "2022-03-25", id)
        expect(listing).toBe(false)
      })
			it('Price has to be of range [10, 10000].. R4-5', async () => {
        let listing
        listing = await createListing("test title", "This is a test description that should work as it is more than 20 chars", 5, "2022-03-25", id)
        expect(listing).toBe(false)
        listing = await createListing("test title", "This is a test description that should work as it is more than 20 chars", 500000, "2022-03-25", id)
        expect(listing).toBe(false)
      })
			it('last_modified_date must be after 2021-01-02 and before 2025-01-02. R4-6', async () => {
        let listing
        listing = await createListing("test title", "This is a test description that should work as it is more than 20 chars", 5000, "2020-03-25", id)
        expect(listing).toBe(false)
        listing = await createListing("test title", "This is a test description that should work as it is more than 20 chars", 5000, "2027-03-25", id)
        expect(listing).toBe(false)
      })
			it('owner_email cannot be empty. The owner of the corresponding product must exist in the database. R4-7', async () => {
				// Register the owner_id
				const testListing = new Listing({
					title: 'test title',
					description: "This is a test description that should work as it is more than 20 chars",
					price: 5000,
					last_modified_date: "2022-03-25",
					owner_id: id
				})
				await testListing.save()
				const listing = await createListing("test title", "This is a test description that should work as it is more than 20 chars", 5000, "2022-03-25", id)
				expect(listing).not.toBe(false)
				expect(user.email).toEqual('test@gmail.com')
				expect(user.username).toEqual('testRegister')
				await User.findOneAndRemove({ email: 'test@gmail.com' })
			})
			it('should create the listing correctly, and should fail if a listing of the same title is created again R4-8', async () => {
				// Register the test@gmail.com account
				let status = await createListing("test title", "This is a test description that should work as it is more than 20 chars", 5000, "2022-03-25", id)
				expect(status).toBe(true)
				let listing = Listing.findOne({ title: 'test title',owner_id: id })
				expect(listing).not.toBeUndefined()
				status = await createListing("test title", "This is a test description that should work as it is more than 20 chars", 5000, "2022-03-25", id)
				expect(status).toBe(false)
				await User.findOneAndRemove({ email: 'ammar@gmail.com' })
				
			})
    })})