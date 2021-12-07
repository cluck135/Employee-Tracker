const inquire = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const questions = require('./src/questions');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: '',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

function start() {
        inquire.prompt(questions.main).then( (answer) => {
            const choice = answer.main;
            switch (choice) {
                case 'view all departments': 
                db.query('SELECT * FROM department', function (err, results) {
                    const table = cTable.getTable(results);
                    console.log(table);
                    start();
                });
                    break;
                case 'view all roles' :
                    db.query('SELECT * FROM role', function (err, results) {
                        const table = cTable.getTable(results);
                        console.log(table);
                        start();
                    });
                    break;
                case 'view all employees' : 
                    db.query('SELECT * FROM employee', function (err, results) {
                        const table = cTable.getTable(results);
                        console.log(table);
                        start();
                    });
                    break;
                case 'add a department' :
                    inquire.prompt(questions.addDepartment).then( (answer) => {
                        const department = answer.department;
                        db.query('INSERT INTO department(name) VALUE (?)', department, (error, info) => {
                            if (error) {
                                console.log(error);
                            } else {
                                const table = cTable.getTable(info);
                                console.log(department);
                                console.log(table);
                                start();
                            }
                        })
                    })
                    
                    break;
                case 'add a role' : 
                    inquire.prompt(questions.addRole).then( (answers) => {
                        const roleName = answers.roleName;
                        const roleSalary = answers.roleSalary;
                        const roleDepartment = answers.roleDepartment;
                        db.query('INSERT INTO role(title, salary, department_id) VALUE (?,?,?)', department, (error, info) => {
                            if (error) {
                                console.log(error);
                            } else {
                                const table = cTable.getTable(info);
                                console.log(department);
                                console.log(table);
                                start();
                            }
                        })
                    })
                    break;
                case 'add an employee' :

                    break;
                case 'update an employee role' :

                    break;
                case 'quit': //make it exit
                break;
            }
            // modift SQL here depending on the answers
        })

}

start();
