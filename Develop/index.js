// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'github',
        message: 'What is your Github username?'
    },

    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?'
    },

    {
        type: 'input',
        name: 'title',
        message: 'What is your project called?'
    },

    {
        type: 'input',
        name: 'description',
        message: 'Write a short description of your project.'
    },

    {
        type: 'input',
        name: 'installation',
        message: 'What command should be run to install dependencies?'
    },

    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your application:',
        choices: ['MIT', 'Apache 2.0', 'GPL', 'BSD', 'None']
    },

    {
        type: 'input',
        name: 'usage',
        message: 'What does the user need to know about using the repo?'
    },

    {
        type: 'input',
        name: 'tests',
        message: 'What command should be entered to run tests?'
    },

    {
        type: 'input',
        name: 'contributing',
        message: 'What does the user need to know about contributing to the repo?'
    },


    
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    const filePath = `./output/${fileName}`;
    fs.writeFile(filePath, data, err => {
        if (err) {
            console.error(err);
            return; 
        }
        console.log('README.md file generated successfully!')
    })
}

// TODO: Create a function to initialize app
function init() {
    inquirer
      .prompt(questions)
      .then(answers => {
        const readmeContent = `# ${answers.title}
  
  ## Description
  ${answers.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  ${answers.installation}
  
  ## Usage
  ${answers.usage}
  
  ## License
  This project is covered under the ${answers.license} license.
  
  ## Contributing
  ${answers.contributing}
  
  ## Tests
  ${answers.tests}
  
  ## Questions
  For additional questions, contact me:
  - GitHub: [https://github.com/${answers.github}](https://github.com/${answers.github})
  - Email: ${answers.email}
  `;
        writeToFile('README.md', readmeContent);
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  // Function call to initialize app
  init();