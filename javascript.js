const inquire = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const questions = require('./src/questions');

let table;
let departList;

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
        const departmentList = await db.query('SELECT * FROM department');
        return departmentList;
    }
    const roles = async () => {
        const roleList = await db.query('SELECT * FROM role');
        return roleList;
    }
    const employees = async () => {
        const employeeList = await db.query('SELECT * FROM employee');
        return employeeList;
    }

    const managers = async () => {
        const managerList = await db.query('SELECT first_name, last_name FROM employee WHERE manager_id = NULL');       
        return managerList;
    }
    
        inquire.prompt(questions.main).then( async (answer) => {
            const choice = answer.main;
            switch (choice) {
                case 'view all departments': 
                        departList = await departments();
                        table = cTable.getTable(departList[0]);
                        console.log(table);
                        start();
                    break;
                case 'view all roles' :
                        let roleList = await roles();
                        table = cTable.getTable(roleList[0]);
                        console.log(table);
                        start();
                    break;
                case 'view all employees' : 
                        let employeeList = await employees();
                        table = cTable.getTable(employeeList[0]);
                        console.log(table);
                        start();
                    break;
                case 'add a department' :
                    inquire.prompt(questions.addDepartment).then( (answer) => {
                        const department = answer.department;
                        db.query('INSERT INTO department(name) VALUE (?)', department).then(() => {
                                console.log(`added ${department} to the database`);
                                start();
                        })
                    })
                    break;
                case 'add a role' : 
                    departList = await departments();
                    const departmentStrArray = departList[0].map(depObj => {
                        return depObj.name;
                    });
                    questions.addRole[2].choices = departmentStrArray;
                    inquire.prompt(questions.addRole).then((answers) => {
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
                        db.query('INSERT INTO role (title, salary, department_id) VALUES ( ? , ? , ? )', [roleName, roleSalary, roleDepartmentId]).then(() => {
                            console.log(`added ${roleName} to the database`);
                            start();
                        })
                    })
                    break;
                case 'add an employee' :
                    departList = await departments();
                    roleList = await roles();
                    let managerList = await managers();
                    const departmentStrArray = departList[0].map(depObj => {
                        return depObj.name;
                    });
                    questions.addRole[2].choices = departmentStrArray;
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
                        db.query('INSERT INTO role (title, salary, department_id) VALUES ( ? , ? , ? )', [roleName, roleSalary, roleDepartmentId]).then(() => {
                            console.log(`added ${roleName} to the database`);
                            start();
                        })
                    })
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
