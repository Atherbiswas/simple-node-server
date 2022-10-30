const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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




const uri = "mongodb+srv://Ather1:Hehw09EuCGhCGxPO@cluster0.x7ap8hv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const userColletion = client.db('simpleNode').collection('users');
        // const user = {name: 'ather', email: 'ather@gmail.com'};
        // const result = await userColletion.insertOne(user);
        // console.log(result)

        app.get('/users', async(req, res) => {
            const cursor = userColletion.find({});
            const users = await cursor.toArray();
            res.send(users);
        })


        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userColletion.insertOne(user);
            console.log(result);
            user._id = result.insertedId
            res.send(user);
        });
    }
    finally{

    }
}

run().catch(err => console.log(err))



// app.get('/users', (req,res) => {
//     if(req.query.name){
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
//         res.send(filtered);
//     }
//     else{

//         res.send(users);
//     }
// });

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// });

app.listen(port, () => {
    console.log(`simple node server running on port ${port}`);
});