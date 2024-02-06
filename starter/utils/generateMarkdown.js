// Function to render the license badge based on the provided license data
function renderLicenseBadge(license) {
  if (license) {
    return `[![License: ${license}](https://img.shields.io/badge/License-${license}-brightgreen.svg)](https://opensource.org/licenses/${license})\n\n`;
  } else {
    return ""; // Return an empty string if no license is provided
  }
}

// Function to generate markdown for README
function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license); // Render the license badge
  let screenshotDescription = "";
  if(data.screenshots){
    screenshotDescription = `![Screenshot](${data.screenshots})`;
  }
  // variable that generates the README file
  const readMe = `
  # ${data.title}
  
  ## License
  ${licenseBadge}
  
  ## Overview
  ${data.overview}

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
  To set up and view this project locally, follow these simple steps:
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
  If you're interested in sharing ideas, experiences, or collaborating on projects, please feel free to get in touch via email at [GitHub](https://github.com/${data.github}) or email me at [${data.email}](mailto:${data.email}).
  
 ${data.license ? `## License
This project is licensed under the ${data.license}.` : ""}
`;

  return readMe;
}

// exporting file to index.js
module.exports = generateMarkdown;
