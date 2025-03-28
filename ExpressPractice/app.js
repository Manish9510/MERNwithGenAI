const express=require('express');
const app=express();
app.use(express.json());

tasks=[];
app.get('/task',(req,res)=>{
    res.status(200).json({
        tasks:tasks
    })
})

app.post('/task',(req,res)=>{
    if(!req.body.task){
        res.status(400).send("Task is required");
        return;
    }
    tasks.push(req.body.task);
    res.status(200).send("Task added successfully");
})

app.put('/task/:id',(req,res)=>{
    if(!req.params.id){
        res.status(400).send("Id required");
        return;
    }
    if(!req.params.id){
        res.status(400).send("Id is required");
        return;
    }
    tasks[req.params.id]=req.body.task;
    res.status(200).send("Task updated successfully");
})
app.delete('/task/:id',(req,res)=>{
    if(!req.params.id){
        res.status(400).send("Id is required");
        return;
    }
    tasks.splice(req.params.id,1);
    res.status(200).send("Task deleted successfully");
})


app.listen(3000,()=>{
    console.log(`server started at https://localhost:3000`);
});