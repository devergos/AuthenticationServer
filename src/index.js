require('./model/User');
require('./model/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

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
app.get('/', requireAuth, (req, res) => {
    res.send('Hi There!');
});

app.listen(3000, () => {
    console.log('Listening on Port 3000')
})
