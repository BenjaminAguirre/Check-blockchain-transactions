import express from "express";
import bodyParser from "body-parser";
import paymentsRouter from "./router/paymentsRouter";
import cors from "cors";
import {createTx, getTx} from "./database/db"
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.text({ type: "text/plain" }));//middleware que transforam req.body a un json
app.use(cors());

const PORT = 8000;

app.use("", paymentsRouter)
app.post("/txs", async(_req:any, res: any) =>{
    const {id, amount, txId} = _req.body;
    console.log(id);
    
    const response = await createTx(id, amount, txId)
    res.send(response)
})
app.get("/txsId", async(_req:any, res: any) =>{
    const id = _req.body.id;
    const response = await getTx(id)
    res.send(response)
})



app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});