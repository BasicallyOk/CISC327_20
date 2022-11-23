From a scrum meeting conducted on Saturday November 19th, 2022

## Drake:
updateListingTesting pushed to main and CreateListing.test pushed so Ammar can finish his part
created input testing shotgun testing and output testing for updateListingTesting and created test cases for SQL injection for create listing, end 3 parameters using the test cases in the given file
no difficulties currently
finished A4 and A5 looking to start A6 
## Robbie:
Worked on the InjectionTestingUserRegister branch with Khoa specifically on the Register.test.js file. 
Finished the injection testing for Register.test.js 
No difficulties
Make sure that everything works and nothing breaks 
## Khoa:
Worked on injectionTestingUserRegister and mongo-docker. mongo-docker has been merged
Moved everything to docker along with Robbie
A few difficulties. Many selenium tests were not behaving predictably, probably due to the speed that it goes through the website. Another difficulty is with getting mongodb to work within a docker container. Turns out it was due to a typo in the connection string.
Everything ships correctly, every test passing consistently. Ships everything to dockerhub.
## Ammar:
Worked on createListingTesting to finish A4 and CreateListing.test with Drake 

Some test cases written, more than 2

The test cases written for the register user is to check if the user will be created by making the email and password field legal. and then check if the user will be created by providing illegal fields by giving an incorrect email address by taking out the"@gmail.com" field with a proper password. This should not submit the text to the database.
The test cases written for the create listing feature is to check if the listing will be created by making the title, description, and price field legal. and then check if the listing will be created by providing illegal fields by giving an incorrect price field by using negative numbers. This should not submit the text to the database.
Fixed all of them and made sure proper routing was done such that createListing redirects to the profile and register user will redirect to the profile page as well.
Made the jest test cases for the SQL injection for title and description so it works now for every case in the file

There were alot of problems with the routing and testing and the main problem was that the price test in listingUtils did not check if the price entered was a number so had to fix that.

All testings are done so everything should be fine for A4 and A5
