const Listing = require('../Listing')

async function createListing (title, description, price, last_modified_date, owner_id) {
  // Validate if input is empty
  const alphanumeric = /^[^\s!@#$%^&*)(':;][a-zA-Z0-9\s]*[^\s!@#$%^&*)(':;]$/gm
  const dateBefore = new Date('2025-01-02')
  const dateAfter = new Date('2021-01-02')
  if (!(alphanumeric.test(title)) && length(title) > 80) {
    return false
  }
  // Check if local part is longer than 64. Regex cant test this
  if (!(description.length >= 20 && description.length <= 2000 && description.length > title.length)) {
    return false
  }
  if (!(price >= 10 && price <= 10000)) {
    return false
  }
  if (!(last_modified_date >= dateAfter && last_modified_date <= dateBefore)) {
    return false
  }

  let listing = await Listing.findOne({ owner_id })
  if (owner_id) {
    if (!(owner_id.email)) {
      return false
    }
  } else { // If user does not exist
    return false
  }
  listing = await Listing.findOne({ owner_id, title })
  if (listing) {
    return false
  }

  const newListing = new Listing({
    title,
    description,
    price,
    last_modified_date,
    owner_id
  })
  await newListing.save()
  return true
}

module.exports = { listing }
