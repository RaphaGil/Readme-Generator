// function to generate markdown for README and license Badge

function generateMarkdown(data) {
  let licenseBadge = "";
  if (data.license) {
    // If there is a license specified in the data, create a license badge
    licenseBadge = `[![License: ${data.license}](https://img.shields.io/badge/License-${data.license}-brightgreen.svg)](https://opensource.org/licenses/${data.license})\n\n`;
  }
  let screenshotDescription = "";
  if(data.screenshots){
  screenshotDescription = `![Screenshot](${data.screenshots})`;
  }
  // variable that generate the readMe file
  const readMe = `
  # ${data.title}
  
  ## License
  ${licenseBadge}

  ## Description
  ${data.description}
  ## Table Of Content
  - [Title](#title)

  - [Overview](#overview)

  - [Description](#description)

  - [Installation](#installation)

  - [Screenshots](#screenshots)

  - [Usage](#usage)

  - [License](#license)

  - [Contributors](#contributor)

  - [Tests](#test)

  - [Questions](#questions)

  ## Installation
  ${data.installation}

  ## Screenshots
  ### Dashboard Overview
  ${screenshotDescription}

  ## Usage
  ${data.usage}

  ## Contributors
  ${data.contributor}

  ## Tests
  ${data.test}
  
  ## Questions
  Any questions about this project please send me a message on https://github.com/${
    data.github
  } or email me at [${data.email}](mailto:${data.email})
  ${
    data.license
      ? `## License
  This project is licensed under the ${data.license} .`
      : ""
  }
`;
  return readMe;
}

// exporting file to index.js
module.exports = generateMarkdown;
