require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const passportSetup = require("./config/passport/passport-setup.js");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const cors = require("cors");

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));



app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

app.use(cors({
  //allow other domains/origins to send cookies
  credentials: true,
  // this is the domain we want cookies from (our React App)
  origin: "http://localhost:3000"
}));


app.use(session({
  secret: "hello",
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

passportSetup(app);


const index = require('./routes/index');
app.use('/', index);

const homePage = require('./routes/HomePage.js');
app.use('/api', homePage);

const product = require('./routes/product');
app.use('/api', product);

const about = require('./routes/about');
app.use('/api', about);

const contact = require('./routes/contact');
app.use('/api', contact);

const messages = require('./routes/messages');
app.use('/api', messages);

const authRouter = require("./routes/auth-router.js");
app.use("/api", authRouter);

const accountRouter = require("./routes/Account.js");
app.use("/api", accountRouter);


app.use((req,res,next)=> {
  res.sendFile(path.join(__dirname, "public","index.html"))
})




module.exports = app;
