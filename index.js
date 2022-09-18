const express = require('express')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000
const userRoutes = require("./routes/users.routes.js");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!! server is running')
})

app.use("/user", userRoutes);

app.all("*", (req, res) => {
    res.send("NO Route Found")
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})