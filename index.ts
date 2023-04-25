import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/ping", (_req, res) => {
    res.send("pong");
});

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
}); 

app.get("/bmi", (req, res) => {
    console.log(req.query);
    const params = req.query;
    const height = Number(params.height);
    const weight = Number(params.weight);
    if (!height || !weight) {
        res.status(500).json({
            error: "malformatted parameters"
          });
        return;
    }
    const bmi = calculateBmi(height, weight);
    res.json({weight, height, bmi});
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

