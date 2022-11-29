const express = require('express');
const app = express();

app.use(express.json());

app.post('/saml/hook', (req, res) => {
    console.log("Received request at 'saml/hook': ", request);
    res.status(204).json();
});

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
});

app.listen(process.env.PORT || 3000);
