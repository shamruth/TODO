const express=require('express');
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')
var tasks=[];//an empty array
app.get('/',(req,res)=>
{
    res.status(200).json('Welcome, your app is working well');
    res.render('login');
})
app.get('/todo',(req,res)=>
{
    const list_task=tasks.map(task=>
            `<li>${task} 
            <form action="/delete" method="POST" style="border-radius:150px,background color:orange">
            <input name="task_delete" value="${task}" type="hidden"/>
            <button type="submit">DELETE</button>
            </form>
            <form action="/edit" method="POST" class=edit>
            <input name="old_task" value="${task}" type="hidden"/>
            <label>ENTER TEXT TO EDIT TASK</label>
            <input name="new_task" type="text"> 
            <button type="submit">EDIT</button>
            </form>
            </li>`
        ).join(' ');
    res.render('task',{task:list_task});
});
app.post('/addtask',(req,res)=>
{
    tasks.push(req.body.ENTEREDTASK);
    res.redirect('/todo');
});
app.post('/delete',(req,res)=>
{
    const dtask=req.body.task_delete;
    tasks.splice(tasks.indexOf(dtask),1);
    console.log(tasks.indexOf(dtask));

    res.redirect("/todo");
});
app.post('/edit',(req,res)=>{
    const oldtask=req.body.old_task;
    const index=tasks.indexOf(oldtask);
    tasks[index]=req.body.new_task;
    console.log(tasks);
    res.redirect('/todo');  
})
app.listen(9000,()=>
{
    console.log("http://localhost:9000");
});
module.exports=app;