// node variables
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const generateMarkdown = require("./starter/utils/generateMarkdown");
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
// array of questions for user
const userQuestion = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "what is the title of the project?",
      // added validation should incase the user doesn't input any answer
      validate: (answer) =>
        answer === "" ? "Please answer the question!" : true,
    },
    {
      type: "input",
      name: "overview",
      message: "please write an overview for your project:",
      validate: (answer) =>
        answer === "" ? "Please answer the question!" : true,
    },
    {
      type: "input",
      name: "description",
      message: "please describe your project:",
      validate: (answer) =>
        answer === "" ? "Please answer the question!" : true,
    },
    {
      type: "input",
      name: "installation",
      message: "how do you install your project?",
      validate: (answer) =>
        answer === "" ? "Please answer the question!" : true,
    },
    {
      type: "input",
      name: "screenshots",
      message: "put the link of the screenshot of the dashboard overview:",
      validate: (answer) =>
        answer === "" ? "Please answer the question!" : true,
    },
    {
      type: "input",
      name: "usage",
      message: "how is your project used?",
      validate: (answer) =>
        answer === "" ? "Please answer the question!" : true,
    },
    {
      type: "checkbox",
      name: "license",
      message: "which of these license is applicable to your repo?",
      choices: ["APACHE", "TOMCAST", "MIDDLEWARE", "MIT", "NONE"],
    },
    {
      type: "input",
      name: "contributor",
      message: "please list contributors?",
      validate: (answer) =>
        answer === "" ? "Please answer the question!" : true,
    },
    {
      type: "input",
      name: "test",
      message: "require test? please provide walk through",
      validate: (answer) =>
        answer === "" ? "Please answer the question!" : true,
    },
    {
      type: "input",
      name: "github",
      message: "what is your github username?",
      validate: (answer) =>
        answer === "" ? "Please answer the question!" : true,
    },
    {
      type: "input",
      name: "email",
      message: "what is your email address?",
      validate: function (answer) {
        const emailRegex =
          /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/i;
        if (!emailRegex.test(answer)) {
          return "no way man! please get valid";
        }
        return true;
      },
    },
  ]);
  const generateHTML = (answers) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  <style>
    .list-group-item {
      font-size: 18px; /* Adjust the font size as needed */
    }
  </style>
  <title>Readme Generator</title>
</head>
<body>
  <div class="p-5 mb-4 bg-body-tertiary rounded-3">
  <div class="container-fluid py-5">
    <h1 class="display-5 fw-bold title">${answers.title}</h1>
    <h3 class="col-md-8 fs-4">Description</h3> 
    <h2 ${answers.description}.</h2>
    <p class="col-md-8 fs-4">Table Of Content <br></p>
    <ul class="list-group">
      <li class="list-group-item"><a href ='#title'>- Title</a></li>
      <li class="list-group-item"><a href ='#overview'>- Overview</a></li>
      <li class="list-group-item"><a href ='#description'>- Description</a></li>
      <li class="list-group-item"><a href ='#installation'>- Installation</a></li>
      <li class="list-group-item"><a href ='#screenshots'>- Screenshots</a></li>
      <li class="list-group-item"><a href ='#usage'>- Usage</a></li>
      <li class="list-group-item"><a href ='#license'>- License</a></li>
      <li class="list-group-item"><a href ='#contributors'>- Contributors</a></li>
      <li class="list-group-item"><a href ='#tests'>- Tests</a></li>
      <li class="list-group-item"><a href ='#questions'>- Questions</a></li>
    </ul>
    <h3 class="col-md-8 fs-4" id='installation'>Installation</h3>
    <p>${answers.installation}</p>
    <h3 class="col-md-8 fs-4" id='screenshot'>Screenshots</h3>
    <p>${answers.screenshots}</p>
    <h3 class="col-md-8 fs-4" id='usage'>Usage</h3>
    <p>${answers.usage}.</p>
    <h3 class="col-md-8 fs-4" id='contributors'>Contributors</h3>
    <p>${answers.contributors}</p>
    <h3 class="col-md-8 fs-4 " id='tests'>Tests</h3>
    <p>${answers.tests}</p>
    <h3 class="col-md-8 fs-4" id='questions'>Questions</h3>
    <p>${answers.questions}</p>
    <h3 class="col-md-8 fs-4" id='license'>License</h3>
    <p>${answers.license}</p>


  </div>
</div>
</body>
</html>`;
// function to write README file, method which took 2 parameter, it does this by calling fs.writeFile()
function writeToFile(fileName, data) {
  fs.writeFile(fileName, generateMarkdown(data), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written successfully!");
    }
  });
}
// function to initialize program
// function to initialize program
function init() {
  // Prompt the user for input
  userQuestion()
    .then((data) => {
      writeToFile("README.md", data);
      return data; // Return data to the next then block
    })
    .then((answers) => {
      return writeFileAsync('index.html', generateHTML(answers)); // Return the promise
    })
    .then(() => {
      console.log('HTML file written successfully!');
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}



// function call to initialize program
init();
