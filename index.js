const inquirer = require('inquirer');
const {viewDepartments, viewRoles, viewEmployees, addDept, addRole} = require("./queries.js");

function mainMenu(){
    inquirer
    .prompt([
        {
            type: "list",
            message: "What do you want to do?",
            name: "action",
            choices:[
                {name: "View all departments", value: "viewDept"},
                {name: "View all roles", value: "viewRoles"},
                {name: "View all employees", value: "viewEmpl"},
                {name: "Add a department", value: "addDept"},
                {name: "Add a role", value: "addRole"},
                {name: "Close application", value: "close"}
                // add an employee
                // update an employee role
            ]
        }
    ])
    .then((response) => {
        switch(response.action){
            case "viewDept":
                viewDepartments(mainMenu);
                break;
            case "viewRoles":
                viewRoles(mainMenu);
                break;
            case "viewEmpl":
                viewEmployees(mainMenu);
                break;
            case "addDept":
                addDeptQuestions();
                break;
            case "addRole":
                addRoleQuestions();
                break;
            case "close":
                process.exit();
        }
    });
}
                      
function addDeptQuestions(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of this department?",
            name: "deptName",
        }
    ])
    .then((response) => {
        addDept(response.deptName, mainMenu);
    });
}

function addRoleQuestions(){
    viewDepartments((result) => {
        let deptChoices = [];

        for(let i = 0; i < result.length; i++){
            deptChoices.push({name: result[i].Department, value: result[i].Department_ID});
        }
        
        inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of this role?",
                name: "roleName",
            },
            {
                type: "input",
                message: "What is the salary of this role",
                name: "salary"
            },
            {
                type: "list",
                message: "What department is this role in?",
                name: "department",
                choices: deptChoices
            }
        ])
        .then((response) => {
            addRole(response.roleName, response.salary, response.department, mainMenu);
        });
    })
}

mainMenu();