const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportStrategy = require('./middleware/passport-strategy');
const authRoutes = require('./routes/auth.routes');
const keys = require('./keys/keys.dev');
const app = express();
const port = 3000;

mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('Mongodb connected'))
  .catch(e => console.error(e))

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

module.exports = {path: '/api', handler: app};
