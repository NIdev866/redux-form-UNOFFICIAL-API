const mysql = require("mysql")

let connection = mysql.createConnection({
  host: "localhost",
  user: "nidev",
  password: "01sql10",
  database: "resume_pro"
})

connection.connect(function(error){
  if(!!error){
    console.log("error")
  }
  else{
    console.log("connected")
  }
})

module.exports = connection