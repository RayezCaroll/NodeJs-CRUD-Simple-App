
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'studentdb'
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL connected");
});

app.get('/students', (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/students', (req, res) => {
    const { name, age } = req.body;
    db.query("INSERT INTO students (name, age) VALUES (?, ?)", [name, age], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, age });
    });
});

app.put('/students/:id', (req, res) => {
    const { name, age } = req.body;
    db.query("UPDATE students SET name = ?, age = ? WHERE id = ?", [name, age, req.params.id], (err) => {
        if (err) throw err;
        res.json({ id: req.params.id, name, age });
    });
});

app.delete('/students/:id', (req, res) => {
    db.query("DELETE FROM students WHERE id = ?", [req.params.id], (err) => {
        if (err) throw err;
        res.json({ deleted: req.params.id });
    });
});

app.listen(port, () => console.log(`API running on port ${port}`));
