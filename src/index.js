const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(authRoutes);

const mongoUri = 'mongodb+srv://admin:1234@cluster0-6qmtw.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
});
mongoose.connection.on('error', () => {
    console.log('Error Connection to mongo', err);
});
app.get('/', (req, res) => {
    res.send('Hi There!');
});

app.listen(3000, () => {
    console.log('Listening on Port 3000')
})
