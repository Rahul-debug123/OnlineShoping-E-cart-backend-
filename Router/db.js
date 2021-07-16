var mysql=require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : '',
    password : '',
    database : 'users'
});

module.exports=connection;