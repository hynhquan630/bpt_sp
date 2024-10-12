import mysql from 'mysql'

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'bpt',
})

db.connect(function (err) {
    if (err) {
        console.error("Error connecting: " + err.stack)
        return
    }
    console.log("Connected as id" + db.threadId)
})

db.query("SELECT * from artist", function (error, result, fields) {
    if (error) throw error
    result.forEach(result => {
        console.log(result)
    })
})