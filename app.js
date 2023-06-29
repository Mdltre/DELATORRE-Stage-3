const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sysdev_recruitment',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL server: ', err);
    return;
  }
  console.log('Connected to MySQL server');
});

// get favorite = value from user input
app.get('/programming-language/new', (req, res) => {
  const favoriteLanguage = req.query.favorite;

  const query = `INSERT INTO programming_languages (favorites) VALUES ('${favoriteLanguage}')`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error inserting data into the table: ', err);
      res.status(500).send('Error inserting data into the table');
      return;
    }

    console.log('Successfully inserted data into the database.');
    res.send(`I like ${favoriteLanguage}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
