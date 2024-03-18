const inquirer = require('inquirer');
const {viewDepartments} = require("./queries.js");

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
                {name: "Close application", value: "close"}
                // add a department
                // add a role
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
                break;
            case "viewEmpl":
                break;
            case "close":
                process.exit();
        }
    })
}
                
                        
mainMenu();