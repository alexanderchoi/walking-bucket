const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items')

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log(`MongoDB connected...`))
  .catch(err => console.log(err));

app.use('/api/items', items);

// app.get('api/customers', (req, res) => {
//   const customer = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Jon', lastName: 'coe'},
//     {id: 3, firstName: 'Jhn', lastName: 'Toe'},
//   ];

//   res.json(customers);
// });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}...`));