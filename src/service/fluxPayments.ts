import dotenv from "dotenv"
import axios from "axios";


dotenv.config();


export const checkTransaction = async (id: string, valuetoCheck: string) => {

  try {

    const response = await axios.get(`https://explorer.runonflux.io/api/txs?address=t3ZDschNfmy78dNzEiBNBc1xB1GdGsuwu14&pageNum=0`);
    const txArray = response.data.txs;
    
    const txValue = parseInt(valuetoCheck, 10);
    const txValueClient = txValue.toString()
   
    
    for (let pepe = 0; pepe < txArray.length; pepe++) {
      const element = txArray[pepe]
      const voutLength = element.vout
      

      for (let index = 0; index < voutLength.length; index++) {
        const vout = voutLength[index];
        const asm = vout.scriptPubKey.asm
        
        if (asm.trim().includes("OP_RETURN ")) {
          const decodedValue = asm.replace("OP_RETURN ", "").trim();
          const idValue = Buffer.from(decodedValue, 'hex').toString();
          
          if (idValue === id) {
            const voutValue = txArray[pepe].vout[0].value
            const intValueExplorer = parseInt(voutValue, 10);
            const refinedValue = intValueExplorer.toString()
            const txValueExplorer = refinedValue.toString()
            if (txValueExplorer === txValueClient) {
              
              const response = {
                  status:200,
                  txValue: txValueClient,
                  txMessage: id,
                  txId: element.txid
              }
              return response
            }
          }
        } else {
          // console.log("No se encontró 'OP_RETURN' en voutValue.");
        }
      }
    }
  }
  catch (error) {
    console.error("Error fetching transactions:", error);
    return { status: "error", message: "Failed to fetch transactions." };
  }
}




