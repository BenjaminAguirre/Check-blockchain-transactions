import express from "express";
import bodyParser from "body-parser";
import paymentsRouter from "./router/paymentsRouter";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/plain" }));//middleware que transforam req.body a un json

const PORT = 8000;

app.use("", paymentsRouter)


app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});