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
        let licenseBadgeURL = '';
      switch (answers.license) {
        case 'MIT':
          licenseBadgeURL = 'https://img.shields.io/badge/license-MIT-brightgreen';
          break;
        case 'Apache 2.0':
          licenseBadgeURL = 'https://img.shields.io/badge/license-Apache%202.0-blue';
          break;
        case 'GPL':
          licenseBadgeURL = 'https://img.shields.io/badge/license-GPL-blueviolet';
          break;
        case 'BSD':
          licenseBadgeURL = 'https://img.shields.io/badge/license-BSD-blue';
          break;
        case 'None':
          licenseBadgeURL = '';
          break;
        default:
          licenseBadgeURL = '';
      }

      function renderLicenseLink(license) {
        switch (license) {
          case 'MIT':
            return '[MIT License](https://opensource.org/licenses/MIT)';
          case 'Apache 2.0':
            return '[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)';
          case 'GPL':
            return '[GPL License](https://www.gnu.org/licenses/gpl-3.0.en.html)';
          case 'BSD':
            return '[BSD License](https://opensource.org/licenses/BSD-3-Clause)';
          default:
            return '';
        }
      }

    renderLicenseLink();      

        const readmeContent = `# ${answers.title}
  ![License](${licenseBadgeURL})

  ## Description
  ${answers.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  - [License](#license)
  
  ## Installation
  ${answers.installation}
  
  ## Usage
  ${answers.usage}
  
  ## Contributing
  ${answers.contributing}
  
  ## Tests
  ${answers.tests}
  
  ## Questions
  For additional questions, contact me:
  - GitHub: [https://github.com/${answers.github}](https://github.com/${answers.github})
  - Email: ${answers.email}

  ## License
  This project is covered under the ${renderLicenseLink(answers.license)}. 
  `;
        writeToFile('README.md', readmeContent);
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  // Function call to initialize app
  init();