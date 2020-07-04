const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportStrategy = require('./middleware/passport-strategy');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const keys = require('./keys');
const app = express();
const port = 3000;

mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Mongodb connected'))
  .catch(e => console.error(e))

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

module.exports = {path: '/api', handler: app};
