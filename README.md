# NodeJS Assignment

## Steps to start server

    1. Clone the repo.
    2. Run `npm install`. 
    3. Run `node server.js`
    4. On the browser, open http://localhost:3001 and enter the respective
        route for the service.
    5. The service routes are: /outputFileContents, /multiply, /fileWrite,
        /nonRepeatingCharacter.

## Steps for the application

    1. For /outputFileContents - Create a GET request for http://localhost:3001/outputFileContents.
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