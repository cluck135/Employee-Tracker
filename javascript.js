const inquire = require('inquirer');
const mysql = require('mysql2');



inquire.prompt({
    engineer: [{
    type: 'input',
    message: 'What is the Engineer\'s name?',
    name: 'name',
},
{
    type: 'input',
    message: 'What is the Engineer\'s ID?',
    name: 'id'
},
{
    type: 'input',
    message: 'What is the Engineer\'s email?',
    name: 'email',
    validate: email => {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
    }         },
{
    type: 'input',
    message: 'what is your github',
    name: 'github',
}],
intern: [{
    type: 'input',
    message: 'What is the Intern\'s name?',
    name: 'name',
},
{
    type: 'input',
    message: 'What is the Intern\'s ID?',
    name: 'id'
},
{
    type: 'input',
    message: 'What is the Intern\'s email?',
    name: 'email',
    validate: email => {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
    }          
},
{
    type: 'input',
    message: 'what is the Intern\'s school?',
    name: 'school',
}]
}).then((answers) => {

    // modift SQL here depending on the answers
})