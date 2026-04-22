const express = require("express");
const app = express();

app.use(express.json());

app.post("/answer", (req, res) => {
    const query = req.body && req.body.query ? req.body.query : "";
    const numbers = query.match(/-?\d+(?:\.\d+)?/g);
    const values = numbers.map(Number);
    const sum = values.reduce((a, b) => a + b, 0);
    const formatted = Number.isInteger(sum) ? sum : parseFloat(sum.toFixed(10));
    res.json({ output: `The sum is ${formatted}.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Running on port ${PORT}`));