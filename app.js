const Express = require('express');
const Exphbs = require('express-handlebars');
const BodyParser = require('body-parser');
const Handlebars = require('handlebars');
const Mongoose = require('mongoose');
const Http = require('http');
const Session = require('express-session');
const Passport = require('passport');
const Multer = require('multer');
const GridStorage = require('multer-gridfs-storage');
const GridStream = require('gridfs-stream');
const Socket = require('socket.io');
const SessionStore = require('connect-mongodb-session')(Session);
const Flash = require('connect-flash');

require('dotenv').config();

// Handlebars property to allow prototype access
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// Define constant 
const PORT = process.env.PORT || 3000;

// Middleware
// Initialize socket.io
const App = Express();
const Server = Http.createServer(App);
const Io = Socket(Server);

// Create view using Handlebars
// Define default layout, layout directory, views directory and Handlebars helper
App.engine('handlebars', Exphbs({
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

// Setting up body parser
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: false }));

// Setting up environment
App.set('view engine', 'handlebars');
App.use('/public', Express.static('public'));

// Connect to MongoDB
const MongooseConnection = Mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

// Initialize GFS
// let gfs;
// MongooseConnection.once('open', () => {
//     gfs = new Mongoose.mongo.GridFSBucket(MongooseConnection.db, {
//         bucketName: 'uploads'
//     });
// });

// Create session store on MongoDB
const Store = new SessionStore({
    uri: process.env.MONGO_URI,
    collection: 'user_sessions'
});

Store.on('error', (error) => {
    console.log(error);
});

// Setting up express session
App.use(Session({
    secret: 'secret',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: Store,
    resave: true,
    saveUninitialized: true
}));

// Routes
App.use('/', require('./routes/index')(Io));
App.use('/users', require('./routes/users')(Io));

// Add port for app
Server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});