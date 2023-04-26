import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const body: any = Number(req.body);
    console.log(body);
    //console.log(req);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target = Number(body.target);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const hours: number[] = body["daily_exercises"];
    if (!target || !hours) {
        res.status(500).json({
            error: "parameters missing"
        });
        return;
    }
    const nums = hours.map(Number);
    if (nums.some(isNaN) || isNaN(target)) {
        res.status(500).json({
            error: "malformatted parameters"
        });
        return;
    }

    const result = calculateExercises(target, nums);
    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

