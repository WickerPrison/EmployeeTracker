const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "tracker_db"
    }
);

class Queries{
    viewDepartments(callback, showTable = true){
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
    
    viewRoles(callback, showTable = true){
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
    
    viewEmployees(callback, showTable = true){
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
    
    viewEmpByMan(manager_id, callback){
        db.query(`SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, role.salary AS Salary, department.name AS Department
        FROM employee 
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        WHERE employee.manager_id = ?`, manager_id, (err, result) => {
            if(err) {
                console.log(err);
            }
            else{
                console.table(result);
                callback();
            }
        });
    }
    
    viewEmpByDept(department_id, callback){
        db.query(`SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, role.salary AS Salary, CONCAT_WS(" ", e2.first_name, e2.last_name) AS Manager
        FROM employee 
        JOIN role ON employee.role_id = role.id
        JOIN employee e2 ON employee.manager_id = e2.id
        WHERE role.department_id = ?`, department_id, (err, result) => {
            if(err) {
                console.log(err);
            }
            else{
                console.table(result);
                callback();
            }
        });
    }
    
    viewDeptSalary(callback){
        db.query(`SELECT department.name AS Department, SUM(role.salary) AS Combined_Salary
        FROM employee 
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        GROUP BY Department`, (err, result) => {
            if(err) {
                console.log(err);
            }
            else{
                console.table(result);
                callback();
            }
        });
    }
    
    addDept(name, callback){
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

    deleteDept(department_id, callback){
        db.query("DELETE FROM department WHERE id = ?", department_id, (err, result) =>{
            if(err) {
                console.log(err);
            }
            else{
                console.log("Department Deleted");
                callback();
            }
        })
    }
    
    addRole(title, salary, department_id, callback){
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department_id], (err, result) =>{
            if(err) {
                console.log(err);
            }
            else{
                console.log("Role Added");
                callback();
            }
        })
    }

    deleteRole(role_id, callback){
        db.query("DELETE FROM role WHERE id = ?", role_id, (err, result) =>{
            if(err) {
                console.log(err);
            }
            else{
                console.log("Role Deleted");
                callback();
            }
        })
    }
    
    addEmpl(first_name, last_name, role_id, manager_id, callback){
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES(?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                console.log("Employee Added");
                callback();
            }
        })
    }
    
    updateEmpl(employee_id, role_id, manager_id, callback){
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

    deleteEmpl(employee_id, callback){
        db.query("DELETE FROM employee WHERE id = ?", employee_id, (err, result) =>{
            if(err) {
                console.log(err);
            }
            else{
                console.log("Employee Deleted");
                callback();
            }
        })
    }
}


module.exports = Queries;