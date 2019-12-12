const express = require('express')
const app = express()
const mongoose = require('mongoose')
const user = require('./routes/api/user')
const problem = require('./routes/api/problem')
const cors = require('cors')

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin:https://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});
// DB Config
const db = require('./config/keys').mongoURI
const dotenv=require('dotenv')
dotenv.config()

// Connect to mongo
//as
mongoose
  .connect(db)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))


mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Direct routes to appropriate files
app.use('/api/user', user)
app.use('/api/problem', problem)

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})
// S2

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, x-access-token');
  res.send(200);
});

// S2
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
