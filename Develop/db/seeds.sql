INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Human Resources"),
        ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 50000, 1),
        ("Mechanical Engineer", 80000, 2),
        ("Software Engineer", 100000, 2),
        ("Lead Engineer", 120000, 2),
        ("Account Manager", 40000, 4),
        ("Financial Analyst", 50000, 4)
        ("Lawyer", 90000, 3),
        ("HR Lead", 60000, 3),
        ("SalesPerson", 75000, 1)

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Chris", "Rock", 1, NULL),
        ("James", "Rogers", 3, 4),
        ("Alex", "Champagne", 8, NULL),
        ("Mark", "Czako", 4, NULL),
        ("Chloe", "Pizey", 6, 5),
        ("Jonah", "Green", 5, NULL),
        ("Harry", "Potter", 9, 1),
        ("Larry", "Laws", 7, 8);