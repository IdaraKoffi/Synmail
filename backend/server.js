const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 21167;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // login is successful if email and password are provided
    const success = email && password;

    res.json({ success, message: success ? 'Login successful' : 'Login failed' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
