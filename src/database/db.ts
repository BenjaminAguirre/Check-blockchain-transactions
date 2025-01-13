import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config()


const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "SatoshiNakamoto2008@",
    database: "tx_test"
}).promise()

export async function getTx(id:string){
    const [rows] = await pool.query("SELECT * FROM tx WHERE id = ?", [id])
    console.log(rows);
}

export async function createTx(id:string, amount: string, txId: string){
   const result = await pool.query(`
        INSERT INTO tx (id, amount, txId)
         VALUE(?, ?, ?)
         `, [id, amount, txId])
    console.log(result);
}




