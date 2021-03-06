const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const connectDB = require('./util/connectDB');
const questionRoute = require('./routes/questionRoute');
const answerRoute = require('./routes/answerRoute');
const userRoute = require('./routes/userRouts');

//middleware
app.use(morgan('dev')); //give route in console//good for development
app.use(bodyParser.json());
app.use(express.json());
app.use(favicon(__dirname + '/client/public/favicon.ico'));

//middleware to allow connect between 3000,5000 servers// its open to any domain//set more headers//for CORS cross origin resorse shearing error... that the requset must be from same sever .... this code bellow make the access

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');

  next(); // to let complete journey to other middlewares :)
});

//routes
app.use('/api', questionRoute);
app.use('/api', answerRoute);
app.use('/api', userRoute);

//serve static asset if production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // Any request that enters will be served the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/client', 'build', 'index.html'));
  });
}
//handleErrors
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

//server listen
const port = process.env.PORT || 5000;
const server = () => {
  app.listen(port, () => {
    console.log(`Listening to port ${port}!`);
  });
};
//db
connectDB(server);