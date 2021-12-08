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
            message: 'What is the new role name?',
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
            choices: []// insert a variable assigned to the array of departments loaded from the db
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
        {
            name: 'employeeManager',
            type: 'list',
            message: 'Who is the employee\'s manager?',
            choices: []
        },// add a questions for add a managers and then have an option for none that sets manager to null for that employeee
    ],
}

module.exports = questions;