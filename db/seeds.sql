INSERT INTO department (name)
VALUES ("IT"),
       ("HR"),
       ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Network Administration", 80000.00, 1),
       ("Service Desk", 75000.00, 1),
       ("IT Manager", 100000.00, 1), 
       ("HR Manager", 82000.00, 2), 
       ("HR Administrator", 70000.00, 2), 
       ("Accountant", 81000.00, 3), 
       ("Accounting Manager", 93000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Wilkinson", 3, null), 
       ("Frankie", "Ross", 2, 1),
       ("Clem", "Gardner", 1, 1),
       ("Harley", "Walker", 4, null), 
       ("Casey", "Holland", 5, 4),
       ("Cory", "Sawyer", 5, 4),
       ("Gail", "Forbes", 7, null), 
       ("Jessie", "Dillard", 6, 7),
       ("Jaden", "Gonzales", 6, 7);
