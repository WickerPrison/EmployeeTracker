const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "tracker_db"
    }
);

function viewDepartments(callback, showTable = true){
    db.query("SELECT id AS Department_ID, name AS Department FROM department", (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            if(showTable){
                console.table(result);
            }
            callback(result);
        }
    });
}

function viewRoles(callback, showTable = true){
    db.query(`SELECT role.id AS Role_ID, title AS Job_Title, salary AS Salary, department.name AS Department 
    FROM role 
    JOIN department ON role.department_id = department.id`, (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            if(showTable){
                console.table(result);
            }
            callback(result);
        }
    });
}

function viewEmployees(callback, showTable = true){
    db.query(`SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, role.salary AS Salary, department.name AS Department, CONCAT_WS(" ", e2.first_name, e2.last_name) AS Manager
    FROM employee 
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    JOIN employee e2 ON employee.manager_id = e2.id`, (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            if(showTable){
                console.table(result);
            }
            callback(result);
        }
    });
}

function addDept(name, callback){
    db.query(`INSERT INTO department (name) VALUES (?)`, name, (err, result) =>{
        if(err) {
            console.log(err);
        }
        else{
            console.log("Department Added");
            callback();
        }
    })
}

function addRole(title, salary, department_id, callback){
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("?", ${salary}, ${department_id})`, title, (err, result) =>{
        if(err) {
            console.log(err);
        }
        else{
            console.log("Role Added");
            callback();
        }
    })
}

function addEmpl(first_name, last_name, role_id, manager_id, callback){
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Employee Added");
            callback();
        }
    })
}

function updateEmpl(employee_id, role_id, manager_id, callback){
    db.query(`UPDATE employee SET role_id = ${role_id}, manager_id = ${manager_id} WHERE id = ${employee_id}`, (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Employee Updated");
            callback();
        }
    })
}

module.exports = {viewDepartments, viewRoles, viewEmployees, addDept, addRole, addEmpl, updateEmpl}