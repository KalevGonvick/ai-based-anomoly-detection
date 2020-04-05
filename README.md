#How to run this application locally
##Client
###How to Install the required libraries?
- cd into the main directory
- use the command ```npm i``` or ```npm install``` to install the required files (assuming you have npm installed on your machine)

###How to Run Development App?
- run the command ```npm start``` in the src directory

###How to Build the App?
- run the command ```npm run-script build```

###How to run the Production App?
- run the command ```serve -s build -l <port number>``` (assuming you have serve installed on your machine)

***ADDITIONAL NOTES FOR RUNNING THIS LOCALLY***
- You will most likely get a CORS error if you run the front end application with the server application on the same machine
- To solve this problem, you will have to either run both instances with an insecure browser or run them on separate machines

##Server
###How to install the required libraries?
assuming you have python installed on your machine, run the following commands:
- ```pip install tensorflow```
- ```pip install pandas```
- ```pip install autoflake```
- ```pip install sklearn```
- ```pip install flask```
- ```pip install flask-socketio```
# CSV Data to JSON Format
```javascript
{
    files: [
        {
            filename: 'sample1.csv',
            data: [[...], [...], [...]],
        },
        {
            filename: 'sample2.csv',
            data: [[...], [...], [...]],
        },
    ],
}
```

#Libraries Used Complete List (Front and Back)
- tensorflow
- pandas
- autoflake
- sklearn
- flask
- flask-socketio
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- apexcharts
- bootstrap
- csv
- react
- react-apexcharts
- react-bootstrap
- react-dom
- react-dropzone
- react-holder-component
- react-p5
- react-parallax
- react-router
- react-router-dom
- react-router-transition
- react-scripts
- redux
- socket.io-client
- three
