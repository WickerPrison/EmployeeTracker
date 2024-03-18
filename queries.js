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

module.exports = {viewDepartments}