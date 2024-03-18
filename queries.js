const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "tracker_db"
    }
);

function viewDepartments(callback){
    db.query("SELECT id AS Department_ID, name AS Department FROM department", (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            console.table(result);
            callback();
        }
    });
}

function viewRoles(callback){
    db.query(`SELECT role.id AS Role_ID, title AS Job_Title, salary AS Salary, department.name AS Department 
    FROM role 
    JOIN department ON role.department_id = department.id`, (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            console.table(result);
            callback();
        }
    });
}

function viewEmployees(callback){
    db.query(`SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, role.salary AS Salary, department.name AS Department, CONCAT_WS(" ", e2.first_name, e2.last_name) AS Manager
    FROM employee 
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    JOIN employee e2 ON employee.manager_id = e2.id`, (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            console.log(result);
            console.table(result);
            callback();
        }
    });
}

module.exports = {viewDepartments, viewRoles, viewEmployees}