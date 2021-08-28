const express = require('express');
const app = express();
const port = 5000 || process.env.port;


app.use('/api/users', require("./routes/users.js"))

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})