const express = require('express')
const cors = require('cors')
const os = require('os');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' })

const app = express()
// app.set('trust proxy', true);

app.use(cors())
app.use(express.json())

const db_url = process.env.DATABASE_URL;
const db_port = process.env.DATABASE_PORT;
const db_name = process.env.DATABASE_NAME;

const db_path = `${db_url}:${db_port}/${db_name}`;
mongoose.connect(db_path)
  .then(() => {
    console.log('DataBase connected successfully');
  })
  .catch(err => {
    console.error('DataBase connection error:', err);
  });




app.get("/", (req, res)=>{
    console.log("ROOT HIT");
    res.status(200).send("Server Working")
})

app.post("/greetings", (req, res)=>{
    // Get the host IP address
    const hostIp = req.ip;
    // Get the network interfaces
    const networkInterfaces = os.networkInterfaces();
    let serverIp = '';
    // Loop through the network interfaces to find the IPv4 address
    for (const interface in networkInterfaces) {
        for (const address of networkInterfaces[interface]) {
            if (address.family === 'IPv4' && !address.internal) {
                serverIp = address.address; // Get the first external IPv4 address
                break;
            }
        }
        if (serverIp) break; // Exit the loop if we found an IP
    }
    res.status(200).json({ "message": `Hello ${req.body.name}, Frontend ${hostIp} And Backend ip ${serverIp} ` })
})

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server running at port ${port} ... DB URL = ${db_path}`)
})