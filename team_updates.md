From a scrum meeting conducted on Wednesday November 9th, 2022

## Drake:
working on branch updateListingTesting
created valid update listing testing and invalid update listing testing for price increase (changed local host to 8080 to work with mac as well as safari instead of chrome)
having difficulties with testing properly using mongodb and selenium
finish all testcases needed as well as have it tested and working on mongodb and selenium 
## Robbie:
Working on the update user profile page on branch user_profile. Added the route to the userupdate page, as well as fixed update user in userUtils.js. 
Currently having difficulty with selenium testing on the front-end of user page. 
Finishing UserProfile.js and testing.
## Khoa:
Working out of selenium. 
Merged in PR [#67](https://github.com/BasicallyOk/CISC327_20/pull/67) and [#64](https://github.com/BasicallyOk/CISC327_20/pull/64). Finished login page, covered 2/3 test methods and a number of test cases.
Having difficulty with getting selenium to work within CI, so now it's pushed back into the backlog. Such a task should require the dockerization of the entire project, which we don't have time for at the moment.
Finishing the rest of the test cases, maybe start integrating docker.
## Ammar:
Working on createListingTesting
The test cases written for the register user is to check if the user will be created by making the email and password field legal. and then check if the user will be created by providing illegal fields by giving an incorrect email address by taking out the"@gmail.com" field with a proper password. This should not submit the text to the database.
The test cases written for the create listing feature is to check if the listing will be created by making the title, description, and price field legal. and then check if the listing will be created by providing illegal fields by giving an incorrect price field by using negative numbers. This should not submit the text to the database.
The difficulty was that I had a tough time trying to run the app itself as there were certain parameters which were giving errors and I had to find its source. I still have not found the problem but am working on it.
To test the file and make sure it works and add way more testing cases in order to fix any loopholes and make the code solid.

Scrum board image will be stored in root as scrumboard.png
