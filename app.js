const path = require('path')
const express = require('express');
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5300
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')

connectDB()

const app = express();

app.use(cors({origin: 'http://localhost:3000'}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

  //routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/recipe', require('./routes/recipe'))

//serve the frontend
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  })
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, console.log(`Server running on  ${port}`));
