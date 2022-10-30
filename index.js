const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('simple node server running')
});

app.use(cors());
app.use(express.json())


const users = [
    {id: 1, name: 'ABC', email: 'abc@gmail.com'},
    {id: 2, name: 'DEF', email: 'def@gmail.com'},
    {id: 3, name: 'GHT', email: 'ght@gmail.com'}
];

app.get('/users', (req,res) => {
    if(req.query.name){
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
        res.send(filtered);
    }
    else{

        res.send(users);
    }
});

app.post('/users', (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user);
})

app.listen(port, () => {
    console.log(`simple node server running on port ${port}`);
});