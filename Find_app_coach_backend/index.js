import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
let coaches = [];

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.post('/coaches', (req, res) => {
    const newCoach = req.body;
    coaches.push(newCoach);
    res.status(201).json(newCoach);
});

app.get('/coaches', (req, res) => {
    res.json(coaches);
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});