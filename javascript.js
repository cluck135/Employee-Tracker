const inquire = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const questions = require('./src/questions');



async function start() {

    const db = await mysql.createConnection(
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
      const departments = async () => {
        const table = await db.query('SELECT name FROM department ');
        const departmentStrArray = table[0].map(depObj => {
            return depObj.name;
        });

        return departmentStrArray;
    }
        const managers = async () => {
            const table = await db.query('SELECT name FROM department ');
            const departmentStrArray = table[0].map(depObj => {
                return depObj.name;
            });

            return departmentStrArray;
    }
    
        inquire.prompt(questions.main).then( async (answer) => {
            const choice = answer.main;
            switch (choice) {
                case 'view all departments': 
                    await db.query('SELECT first_name, last_name FROM employee WHERE id == manager_id', function (err, results) {
                        const table = cTable.getTable(results);
                        console.log(table);
                        start();
                });
                    break;
                case 'view all roles' :
                    await db.query('SELECT * FROM role', function (err, results) {
                        const table = cTable.getTable(results);
                        console.log(table);
                        start();
                    });
                    break;
                case 'view all employees' : 
                    await db.query('SELECT * FROM employee', function (err, results) {
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
                    questions.addRole[2].choices = await departments();
                    inquire.prompt(questions.addRole).then( (answers) => {
                        const roleName = answers.roleName;
                        const roleSalary = answers.roleSalary;
                        const roleDepartment = answers.roleDepartment;
                        const departArray = questions.addRole[2].choices;
                        let roleDepartmentId;
                        departArray.forEach(department => {
                            if (department == roleDepartment) {
                                roleDepartmentId = departArray.indexOf(department, 0) + 1;
                            }
                        });
                        db.query('INSERT INTO role (title, salary, department_id) VALUES ( ? , ? , ? )', [roleName, roleSalary, roleDepartmentId], (error, info) => {
                            if (error) {
                                console.log(error);
                            } else {
                                const table = cTable.getTable(info);
                                console.log(department);
                                console.log(table);    /// since db.query is now a promise, form mysql2 i believe we no longer need the callback function so we can move all this ot the outside of the db.query, otherwise it will go back to Start();
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
