const {Client} = require('pg');
const express = require('express');

const app = express();
app.use(express.json());

const connection = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root123",
    database : "testDB"
})

connection.connect().then(() => console.log("Connected to PostgreSQL database!"));

app.post('/postData', (req,res) => {
    const {name, id} = req.body;
    
    const insert_query =`insert into testtable (name, id) values ($1, $2)`;

    connection.query(insert_query, [name, id], (err, result) => {
        if(!err) 
            {
                console.log("Data inserted successfully!");
                res.status(200).send("Data added successfully");
            }
        else console.log(err.message);
        
    });
});


app.get('/getData', (req,res)=>{
    connection.query('Select * from testtable', (err,result)=>{
        if(!err)
            {
                console.log("Data fetched successfully!");
                res.status(200).send(result.rows);
            }      
        else{
            console.log(err.message);
            res.status(400).send(err.message);
        } 
    })
})

app.get('/getById/:id', (req, res) => {
    const id = req.params.id;
    const fetch_query = `select * from testtable where id = $1`;

    connection.query(fetch_query, [id], (err, result) => {
        if(!err){
            console.log("Data fetched Successfully!");
            if(result.rows.length === 0){
                console.log("No data found for the given ID!");
                res.status(404).send("No data found for the given ID!");
                return;
            }
            res.status(200).send(result.rows);
        }else{
            console.log("Error fetching data: ", err.message);
            res.send(400).send(err.message);            
        }
    })
})

app.put('/updateData/:id', (req, res) =>{
    const id = req.params.id;
    const name = req.body.name;

    const update_query = `update testtable set name = $1 where id =$2`;

    connection.query(update_query, [name, id], (err, result) => {
        if(!err){   
            console.log("Data updated Successfully!");
            res.status(200).send("Data updated successfully!");            
        }
        else{
            console.log("Error updating data: ");
            res.status(400).send(err.message);            
            
        }
    })

})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const del_query = `delete from testtable where id = $1`;

    connection.query(del_query, [id], (err, result) => {
        if(!err){
            console.log("Data deleted successfully!");
            res.status(200).send("Data deleted Successfully!");
        }else{
            console.log("Error Deleting Data");
            res.status(400).send(err.message);            
        }
    })
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    
})