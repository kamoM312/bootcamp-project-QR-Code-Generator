/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

let url = "";

const questions = {
  type: "input",
  name: "url",
  message: "What's your url?",
};

inquirer
  .prompt(
    /* Pass your questions in here */
    questions
  )
  .then((answers) => {
    // Use user feedback for... whatever!!
    url = answers.url;
    console.log(url);

    var qr_svg = qr.image(url, { type: "svg" });
    qr_svg.pipe(fs.createWriteStream("url.svg"));
    var svg_string = qr.imageSync(url, { type: "svg" });

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
