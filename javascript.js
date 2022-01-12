const inquire = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const questions = require('./src/questions');

let table;
let departList;
let roleList;
let employeeList;

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
      )
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
        const managerList = await db.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL');       
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
                        roleList = await db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;');
                        table = cTable.getTable(roleList[0]);
                        console.log(table);
                        start();
                    break;

                case 'view all employees' : 
                        let employeeList = await db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ",manager.last_name) AS manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id;')     
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
                    roleList = await roles();
                    let managerList = await managers();
                    let roleStrArray = roleList[0].map(roleObj => {
                        return roleObj.title;
                    });
                    const managerStrArray = managerList[0].map(managerObj => {
                        let managerName = managerObj.first_name;
                        managerName += ' ' + managerObj.last_name;
                        return (managerName);
                    });
                    questions.addEmployee[3].choices = managerStrArray;
                    questions.addEmployee[2].choices = roleStrArray;

                    inquire.prompt(questions.addEmployee).then( (answers) => {
                        const firstName = answers.employeeFN;
                        const lastName = answers.employeeLN;
                        const employeeRole = answers.employeeRole;
                        const employeeManager = answers.employeeManager;
                        const managerArray = questions.addEmployee[3].choices;
                        const roleArray = questions.addEmployee[2].choices;
                        let employeeManagerId;
                        let employeeRoleId;
                        managerArray.forEach(manager => {
                            if (manager == employeeManager) {
                                employeeManagerId = managerArray.indexOf(manager, 0) + 1;
                            }
                        });
                        roleArray.forEach(role => {
                            if (role == employeeRole) {
                                employeeRoleId = roleArray.indexOf(role, 0) + 1;
                            }
                        });
                        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ? , ? , ? , ? )', [firstName, lastName, employeeRoleId, employeeManagerId]).then(() => {
                            console.log(`added ${firstName} to the database`);
                            start();
                        })
                    })
                    break;

                case 'update employee role' :
                    let employeesList = await employees();
                    roleList = await roles();
                    const employeeStrArray = employeesList[0].map(employeeObj => {
                        let employeeName = employeeObj.first_name;
                        employeeName += ' ' + employeeObj.last_name;
                        return (employeeName);
                    });
                    let rolesStrArray = roleList[0].map(roleObj => {
                        return roleObj.title;
                    });
                    questions.updateEmployee[0].choices = employeeStrArray;
                    questions.updateEmployee[1].choices = rolesStrArray;
                    inquire.prompt(questions.updateEmployee).then( (answers) => {
                        const employeeRole = answers.chooseRole;
                        const employeeName = answers.chooseEmployee;
                        const employeeArray = questions.updateEmployee[0].choices;
                        roleArray = questions.updateEmployee[1].choices;
                        let employeeNameId;
                        let employeeRoleId;
                        employeeArray.forEach(employee => {
                            if (employee == employeeName) {
                                employeeNameId = employeeArray.indexOf(employee, 0) + 1;
                            }
                        });
                        roleArray.forEach(role => {
                            if (role == employeeRole) {
                                employeeRoleId = roleArray.indexOf(role, 0) + 1;
                            }
                        });
                        db.query('UPDATE employee SET role_id = ? WHERE id = ? ;', [employeeRoleId, employeeNameId]).then(() => {
                            console.log(`updated employee\'s to the database`);
                            start();
                        })
                    })

                    break;
                default: console.log('Program ended!');
            }
        })

}

start();
