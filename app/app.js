const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Yamini’s CI/CD Pipeline running on AWS!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
