const express = require("express");
const app = express();
app.use(express.json());
app.post("/answer", (req, res) => {
    const { query } = req.body;
    const numbers = query.match(/-?\d+(?:\.\d+)?/g);
    const values = numbers.map(Number);
    const sum = values.reduce((a, b) => a + b, 0);
    const formatted = Number.isInteger(sum) ? sum : parseFloat(sum.toFixed(10));
    res.json({ output: `The sum is ${formatted}.` });
});
app.listen(process.env.PORT || 3000, () => console.log("Running"));