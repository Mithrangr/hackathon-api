const express = require("express");
const app = express();

app.use(express.json());

function calcSum(query) {
    const numbers = query.match(/-?\d+(?:\.\d+)?/g);
    if (!numbers || numbers.length === 0) return null;
    const sum = numbers.map(Number).reduce((a, b) => a + b, 0);
    return Number.isInteger(sum) ? sum : parseFloat(sum.toFixed(10));
}

// Handle POST
app.post("/answer", (req, res) => {
    const query = req.body && req.body.query ? req.body.query : "";
    const result = calcSum(query);
    if (result === null) return res.json({ output: "The sum is 0." });
    res.json({ output: `The sum is ${result}.` });
});

// Handle GET (some evaluators send health checks via GET)
app.get("/answer", (req, res) => {
    const query = req.query.query || "";
    const result = calcSum(query);
    if (result === null) return res.json({ output: "The sum is 0." });
    res.json({ output: `The sum is ${result}.` });
});

// Root health check
app.get("/", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Running on port ${PORT}`));