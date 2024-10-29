const insertRecord="insert into users (name,username,password) values ($1,$2,$3)"
const validate="select * from users where username=$1 and password=$2"
module.exports={
    // getstudents,
    // getStudentsById,
    // checkEmailExists,
    insertRecord,
    validate
}