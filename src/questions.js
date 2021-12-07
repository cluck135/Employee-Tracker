const mysql = require('mysql2');
const { promisify } = require('util');

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
//const dbQueryAsync = promisify(db.query);// not sure if this should be used to make it a promise

const departments = async () => {
    const table = await db.query('SELECT name FROM department ',  (err, results) => {
        if (err) {
            console.log(err);
        } else {
            const departmentTable = results;
            return(departmentTable);
        }
});
return table;
}

const questions = {
    main: [
        {
            name: 'main',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', 'quit'],
        }
    ],
    addDepartment: [
        {
            name: 'department',
            type: 'input',
            message: 'What is the new department name?',
        }
    ],
    addRole: [
        {
            name: 'roleName',
            type: 'input',
            message: 'What is the new department name?',
        },
        {
            name: 'roleSalary',
            type: 'input',
            message: 'What is the new role salary?',
        },
        {
            name: 'roleDepartment',
            type: 'list',
            message: 'Which department does the role belong too?',
            choices: departments()// insert a variable assigned to the array of departments loaded from the db
        }
    ],
    addEmployee: [
        {
            name: 'employeeFN',
            type: 'input',
            message: 'What is the new employee\'s first name?',
        },
        {
            name: 'employeeLN',
            type: 'input',
            message: 'What is the new employee\'s last name?',
        },
        {
            name: 'employeeRole',
            type: 'input',
            message: 'What is the new employee\'s role?',
        },
    ],
}

module.exports = questions;