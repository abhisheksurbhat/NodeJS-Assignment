# NodeJS Assignment

This is the main repository for the given NodeJS Assignment. The 5 questions asked are:

1. Write a Nodejs server that listens on port 3001 and outputs a file content from any local directory
2. Write a Nodejs server that serves as a RESTFUL API that takes two parameters in a GET call and produces their product. 
3. Write a Nodejs server that serves as a RESTFUL  API that accepts a file content and writes them to the disk.
4. Write a Nodejs server that serves as a RESTFUL  API that accepts a String as an input name and returns the first non-repeating character in the String. 
5. Web Crawler program.

## Steps to start server

  The steps to get the application up and running are as follows:

    1. Clone the repo.
    2. Run `npm install`.
    3. For the first 4 questions, run `node server.js`. This will get the server running on port 3001.
    4. For the Web crawler program, run `node crawler.js --site=https://examplesitename.com`.

## Steps to run the application

There are 4 routes in the main application - */outputFileContents*, */multiply*, */fileWrite*, */nonRepeatingCharacter*. The steps to run them are as follows:

1. For '/outputFileContents' - Create a GET request for http://localhost:3001/outputFileContents.
2. For /multiply -
    * Create a GET request http://localhost:3001/multiply.
    * Provide two parameters x and y with numbers to be multiplied.
3. For /fileWrite -
    * Create a POST request for http://localhost:3001/fileWrite.
    * In the body of the POST request, provide a JSON object with the
        value of the object as the content to be written in the file.
    * Check the ./data folder for a file 'thirdQuesOutput.txt' with the
        content written in the file.
4. For  /nonRepeatingCharacter -
        * Create a GET request for http://localhost:3001/nonRepeatingCharacter.
        * Provide a parameter 'string' to be checked for non-repeating
            characters.

For the crawler program, run `node crawler.js --site=https://sitename.com`. The site name has to be provided as a command line argument in the correct format as mentioned above.

## Testing the application

The unit tests are in the **tests** folder. To run the unit tests, run `npm test` in the terminal/console. 