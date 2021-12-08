INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Human Resources"),
        ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 50000, 1),
        ("HR Lead", 60000, 3),
        ("Lead Engineer", 120000, 2),
        ("Account Manager", 40000, 4),
        ("Mechanical Engineer", 80000, 2),
        ("Software Engineer", 100000, 2),
        ("Financial Analyst", 50000, 4),
        ("Lawyer", 90000, 3),
        ("SalesPerson", 75000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Chris", "Rock", 1, NULL),
        ("Larry", "Laws", 2, NULL),
        ("James", "Rogers", 3, NULL),
        ("Mark", "Czako", 4, NULL),
        ("Alex", "Champagne", 5, 3),
        ("Chloe", "Pizey", 6, 3),
        ("Jonah", "Green", 7, 4),
        ("Harry", "Potter", 8, 2),
        ("Jerry", "Smith", 9, 1);
