const inquirer = require('inquirer');
const {viewDepartments, viewRoles, viewEmployees, addDept, addRole, addEmpl, updateEmpl} = require("./queries.js");

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
                {name: "Add an Employee", value: "addEmpl"},
                {name: "Update Employee Information", value:"updEmpl"},
                {name: "Close application", value: "close"}
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
            case "addEmpl":
                addEmplQuestions();
                break;
            case "updEmpl":
                updateEmplQuestions(true);
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
    }, false)
}

function addEmplQuestions(){
    viewRoles((result) => {
        let roleChoices = [];

        for(let i = 0; i < result.length; i++){
            roleChoices.push({name: result[i].Job_Title, value: result[i].Role_ID});
        }

        viewEmployees((result) => {
            let managerChoices = [];

            for(let i = 0; i < result.length; i++){
                managerChoices.push({name: result[i].First_Name + " " + result[i].Last_Name, value: result[i].Employee_ID});
            }

            inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "firstName",
                },
                {
                    type: "input",
                    message: "What is the employee's last name?",
                    name: "lastName",
                },
                {
                    type: "list",
                    message: "What is this employee's job title?",
                    name: "emplRole",
                    choices: roleChoices
                },
                {
                    type: "list",
                    message:"Who is this employee's manager?",
                    name: "emplManager",
                    choices: managerChoices
                }
            ])
            .then((response) => {
                addEmpl(response.firstName, response.lastName, response.emplRole, response.emplManager, mainMenu);
            });
        }, false)
    }, false)
}

function updateEmplQuestions(){
    viewRoles((result) => {
        let roleChoices = [];

        for(let i = 0; i < result.length; i++){
            roleChoices.push({name: result[i].Job_Title, value: result[i].Role_ID});
        }

        viewEmployees((result) => {
            let emplChoices = [];

            for(let i = 0; i < result.length; i++){
                emplChoices.push({name: result[i].First_Name + " " + result[i].Last_Name, value: result[i].Employee_ID});
            }

            inquirer
            .prompt([
                {
                    type: "list",
                    message: "Which employee would you like to update?",
                    name: "emplUpd",
                    choices: emplChoices
                },
                {
                    type: "list",
                    message: "What is this employee's new job title?",
                    name: "emplRole",
                    choices: roleChoices
                },
                {
                    type: "list",
                    message:"Who is this employee's new manager?",
                    name: "emplManager",
                    choices: emplChoices
                }
            ])
            .then((response) => {
                updateEmpl(response.emplUpd, response.emplRole, response.emplManager, mainMenu);
            });
        }, false)
    }, false)
}

mainMenu();