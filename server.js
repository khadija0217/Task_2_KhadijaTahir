const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

// Temporary "database" 
let users = [];

// Home route 
app.get('/', (req, res) => {
  res.send('Hello! Is backend server works?.');
});

// Signup route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All feilds are important.' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'the mail already registered.' });
  }

  users.push({ name, email, password });
  console.log('All users:', users);

  res.status(201).json({ message: 'Signup successful!' });
});

app.listen(PORT, () => {
  console.log(`Server works: http://localhost:${PORT}`);
});
// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email or password are requried.' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'email or password or wrong.' });
  }

  res.status(200).json({ message: `Welcome back, ${user.name}!` });
});