import express from 'express';

const app =express()

var cors= require('cors')

const port = 5000

app.use(cors())

app.use(express.json());


app.use('/api/user', require('./routes/user'));
app.use('/api/todo', require('./routes/todo'));


app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})