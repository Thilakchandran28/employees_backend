import express from "express";
import cors from "cors";
import mysql from "mysql";
import http from "http";


const app = express();
const server = http.createServer(app);

app.use(cors({
    credentials: true,
    origin: "*"
}));

app.use(express.json({ limit: "10mb" }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ysquare"
});

connection.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("MYSQL Server has been connected");
    }
})

app.post("/api/create/data", (request, response) => {
    const sql_query = `INSERT INTO employees_data (name , designation , email) VALUES ('${request.body.name}',  '${request.body.designation}', '${request.body.email}')`;

    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send("detail has been uploaded");
        }
    })
});



// app.get("/api/list/courses", (request, response) => {
//     const sql_query = `SELECT * FROM  employees_data `;
//     connection.query(sql_query, (error, result) => {
//         if (error) {
//             response.status(500).send(error);
//         }
//         else {
//             response.status(200).send(result);
//         }
//     })
// });


// app.delete("/api/delete/courses/:id", (request, response) => {
//     const sql_query = `DELETE FROM vcentry_courses WHERE id=${request.params.id}`;
//     connection.query(sql_query, (error, result) => {
//         if (error) {
//             response.status(500).send(error);
//         }
//         else {
//             response.status(200).send("Deleted Successfully");
//         }
//     })
// });


const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log("Server is Running");
})