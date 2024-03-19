const inquirer = require('inquirer');
const Queries = require("./queries.js");
queries = new Queries();

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
                {name: "View employees by manager", value: "empByMan"},
                {name: "View employees by department", value: "empByDept"},
                {name: "View combined salary of department", value: "deptSalary"},
                {name: "Add a department", value: "addDept"},
                {name: "Delete a department", value: "deleteDepartment"},
                {name: "Add a role", value: "addRole"},
                {name: "Delete a role", value: "deleteRole"},
                {name: "Add an employee", value: "addEmpl"},
                {name: "Update employee information", value:"updEmpl"},
                {name: "Delete an employee", value: "deleteEmpl"},
                {name: "Close application", value: "close"}
            ]
        }
    ])
    .then((response) => {
        switch(response.action){
            case "viewDept":
                queries.viewDepartments(mainMenu);
                break;
            case "viewRoles":
                queries.viewRoles(mainMenu);
                break;
            case "viewEmpl":
                queries.viewEmployees(mainMenu);
                break;
            case "empByMan":
                empByManQuestions();
                break;
            case "empByDept":
                empByDeptQuestions();
                break;
            case "deptSalary":
                queries.viewDeptSalary(mainMenu);
                break;
            case "addDept":
                addDeptQuestions();
                break;
            case "deleteDepartment":
                areYouSure("department");
                break;
            case "addRole":
                addRoleQuestions();
                break;
            case "deleteRole":
                areYouSure("role");
                break;
            case "addEmpl":
                addEmplQuestions();
                break;
            case "updEmpl":
                updateEmplQuestions(true);
                break;
            case "deleteEmpl":
                areYouSure("employee");
                break;
            case "close":
                process.exit();
        }
    });
}

function areYouSure(deleteElement){
    let n = "";
    if(deleteElement == "employee"){
        n = "n";
    }

    inquirer
    .prompt([
        {
            type: "list",
            message: `Are you sure you want to delete a${n} ${deleteElement}?`,
            name: "areYouSure",
            choices: [
                {name: "Yes", value: true},
                {name: "No", value: false}
            ]
        }
    ])
    .then((response) => {

        if(response.areYouSure){
            switch(deleteElement){
                case "department":
                    deleteDeptQuestions();
                    break;
                case "role":
                    deleteRoleQuestions();
                    break;
                case "employee":
                    deleteEmployeeQuestions();
                    break;
            }
        }
        else{
            mainMenu();
        }
    });
}

function empByManQuestions(){
    queries.viewEmployees((result) => {
        let managerChoices = [];

        for(let i = 0; i < result.length; i++){
            managerChoices.push({name: result[i].First_Name + " " + result[i].Last_Name, value: result[i].Employee_ID});
        }

        inquirer
        .prompt([
            {
                type: "list",
                message: "Whose employees would you like to view?",
                name: "manager",
                choices: managerChoices
            }
        ])
        .then((response) => {
            queries.viewEmpByMan(response.manager, mainMenu);
        });
    }, false)
}

function empByDeptQuestions(){
    queries.viewDepartments((result) => {
        let deptChoices = [];

        for(let i = 0; i < result.length; i++){
            deptChoices.push({name: result[i].Department, value: result[i].Department_ID});
        }
        
        inquirer
        .prompt([
            {
                type: "list",
                message: "Which department's employees would you like to view?",
                name: "department",
                choices: deptChoices
            }
        ])
        .then((response) => {
            queries.viewEmpByDept(response.department, mainMenu);
        });
    }, false)
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
        queries.addDept(response.deptName, mainMenu);
    });
}

function deleteDeptQuestions(){
    queries.viewDepartments((result) => {
        let deptChoices = [];

        for(let i = 0; i < result.length; i++){
            deptChoices.push({name: result[i].Department, value: result[i].Department_ID});
        }
        
        inquirer
        .prompt([
            {
                type: "list",
                message: "What department do you want to delete?",
                name: "department",
                choices: deptChoices
            }
        ])
        .then((response) => {
            queries.deleteDept(response.department, mainMenu);
        });
    }, false)
}

function addRoleQuestions(){
    queries.viewDepartments((result) => {
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
            queries.addRole(response.roleName, response.salary, response.department, mainMenu);
        });
    }, false)
}

function deleteRoleQuestions(){
    queries.viewRoles((result) => {
        let roleChoices = [];

        for(let i = 0; i < result.length; i++){
            roleChoices.push({name: result[i].Job_Title, value: result[i].Role_ID});
        }

        inquirer
        .prompt([
            {
                type: "list",
                message: "Which role would you like to delete?",
                name: "role",
                choices: roleChoices
            }
        ])
        .then((response) => {
            queries.deleteRole(response.role, mainMenu);
        });
    }, false)
}

function addEmplQuestions(){
    queries.viewRoles((result) => {
        let roleChoices = [];

        for(let i = 0; i < result.length; i++){
            roleChoices.push({name: result[i].Job_Title, value: result[i].Role_ID});
        }

        queries.viewEmployees((result) => {
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
                queries.addEmpl(response.firstName, response.lastName, response.emplRole, response.emplManager, mainMenu);
            });
        }, false)
    }, false)
}

function updateEmplQuestions(){
    queries.viewRoles((result) => {
        let roleChoices = [];

        for(let i = 0; i < result.length; i++){
            roleChoices.push({name: result[i].Job_Title, value: result[i].Role_ID});
        }

        queries.viewEmployees((result) => {
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
                queries.updateEmpl(response.emplUpd, response.emplRole, response.emplManager, mainMenu);
            });
        }, false)
    }, false)
}

function deleteEmployeeQuestions(){
    queries.viewEmployees((result) => {
        let emplChoices = [];

        for(let i = 0; i < result.length; i++){
            emplChoices.push({name: result[i].First_Name + " " + result[i].Last_Name, value: result[i].Employee_ID});
        }

        inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee would you like to delete?",
                name: "employee",
                choices: emplChoices
            }
        ])
        .then((response) => {
            queries.deleteEmpl(response.employee, mainMenu);
        });
    }, false)
}

mainMenu();