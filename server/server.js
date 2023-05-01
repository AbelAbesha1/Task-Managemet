const express = require('express');
const app = express();
const port = 5000; // Specify the port you want to listen on
const {v4: uuidv4}=require('uuid')
const cors=require('cors')
 
 app.use(cors())
 app.use(express.json())
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create a MySQL connection pool 
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taskapp',
  waitForConnections: true,
  connectionLimit: 10,                     
  queueLimit: 0
});

// define a route to retrieve data from MySQL and return it as JSON
app.get('/tasks/:userEmail', async (req, res) => {
  
  const {userEmail}=req.params
  console.log(userEmail);
  try {
    // get a MySQL connection from the pool
    const connection = await pool.getConnection();

    // query MySQL for all rows in the specified table
    const [rows, fields] = await connection.execute('SELECT * FROM tasks WHERE user_email=?',[userEmail]);

    // release the connection back to the pool
    connection.release();

    // return the rows as a JSON response
    res.json(rows);
  } catch (error) { 
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// create a new task
app.post('/tasks', async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  const id = uuidv4();
  console.log(user_email, title, progress, date);          

  try {
    // get a MySQL connection from the pool
    const connection = await pool.getConnection();

    // execute the INSERT query
    const query = `INSERT INTO tasks (id, user_email, title, progress, date) VALUES (?, ?, ?, ?, ?)`;
    const values = [id, user_email, title, progress, date];
    const newTask=await connection.execute(query, values);
    //  res.json(newTask)

    // release the connection back to the pool
    connection.release();

    res.send('Task added to database');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// update task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  try {
    // get a MySQL connection from the pool
    const connection = await pool.getConnection();

    // execute the UPDATE query
    const query = `UPDATE tasks SET user_email=?, title=?, progress=?, date=? WHERE id=?`;
    const values = [user_email, title, progress, date, id];
    const [result] = await connection.execute(query, values);

    // release the connection back to the pool
    connection.release();

    if (result.affectedRows > 0) {
      res.send('Task updated in database');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// delete task 
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // get a MySQL connection from the pool
    const connection = await pool.getConnection();

    // execute the DELETE query
    const query = `DELETE FROM tasks WHERE id=?`;
    const values = [id];
    const [result] = await connection.execute(query, values);
    res.json(result)

    // release the connection back to the pool
    connection.release();

    if (result.affectedRows > 0) {
      // res.send('Task deleted from database');
    } else {
      // res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    console.error(error);
    // res.status(500).send('Server Error');
  }
});
//signup
app.post('/signup', async (req , res)=>{
  try {
    const {Email , Password}= req.body
    
     // check if the email already exists in the database
     const connection = await pool.getConnection();
     const [rows, fields] = await connection.execute('SELECT * FROM users WHERE email=?', [Email]);
     connection.release();
     
     if (rows.length > 0) {
       // email already exists
       return res.status(400).json({ error: 'Email already exists' });
     }
    
    // hash the password and insert a new user record in the database
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);
    
    const newUserQuery = 'INSERT INTO users (email, hashed_password) VALUES (?, ?)';
    const newUserValues = [Email, hashedPassword];
    const [newUserResult] = await pool.execute(newUserQuery, newUserValues);
    
    const token = jwt.sign({Email}, 'secret',{expiresIn:'1hr'})
    res.json({Email , token , Password})
    
    // send a success response
    console.log('User created successfully')
    
  } catch (error) {
    console.error(error); 
    if (error) {
      res.json({detail:error.detail})
      
    }
  }
})

 
//Login
app.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // check if the email exists in the database
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM users WHERE email=?', [Email]);
    connection.release();

    if (rows.length === 0) {
      // email not found
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // check if the password is correct
    const user = rows[0];
    const match = await bcrypt.compare(Password, user.hashed_password);
    if (match) {
      // password is incorrect
      const token = jwt.sign({ Email }, 'secret', { expiresIn: '1hr' });
    res.json({ Email, token });
    }
    else{
       alert('incorect password');
    }

    // create a JWT token and send it as a response
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

 
 
 