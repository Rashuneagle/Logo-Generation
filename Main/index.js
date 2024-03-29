const inquirer = require('inquirer');
const shapeFactory = require('./lib/shapeFactory');
const fs = require('fs');


const questions = [
    {
        type: 'input',
        message: 'Enter 3 letters for your logo',
        name: 'title',
    },
    {
        type: 'input',
        name: 'color',
        message: 'What do you want the text color to be?',
    },
    {
        type: 'list',
        message: 'What shape do you want?',
        name: 'shape',
        choices: ['Circle', 'Triangle', 'Square'],
    },
    {
        type: 'input',
        message: 'What is the shape color?',
        name: 'shapeColor',
    },
];


// Function to create SVG file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('SVG has been generated successfully!');
        }
    });
}

// Function to handle user input
function init() {
    inquirer.prompt(questions).then((answers) => {
        // Use shapeFactory to create the shape
        const shape = shapeFactory.createShape(answers.shape, answers.color, answers.title, answers.shapeColor);
        // Get the rendered SVG
        const svgContent = shape.render();
        // Use writeToFile function to save the content to a file
        writeToFile('logo.svg', svgContent);
    });
}

// Call the function
init();