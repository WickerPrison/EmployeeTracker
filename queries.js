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
    db.query("SELECT * FROM department", (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            console.log(result);
            callback();
        }
    });
}

function viewRoles(callback){
    db.query(`SELECT title, salary, department.name AS department 
    FROM role 
    JOIN department ON role.department_id = department.id`, (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            console.log(result);
            callback();
        }
    });
}

function viewEmployees(callback){
    db.query(`SELECT employee.first_name, employee.last_name, role.title AS role, role.salary AS salary, department.name AS department, CONCAT_WS(" ", e2.first_name, e2.last_name) AS manager
    FROM employee 
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    JOIN employee e2 ON employee.manager_id = e2.id`, (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            console.log(result);
            callback();
        }
    });
}

module.exports = {viewDepartments, viewRoles, viewEmployees}