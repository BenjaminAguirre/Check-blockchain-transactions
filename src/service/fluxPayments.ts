import dotenv from "dotenv"
import axios from "axios";

dotenv.config();


export const checkTransaction = async () => {
  let id = "asdasd";
  const valueToCheck = "1.00000000"
  const response = await axios.get(`https://explorer.runonflux.io/api/txs?address=t3ZDschNfmy78dNzEiBNBc1xB1GdGsuwu14&pageNum=0`);
  const txArray = response.data.txs
  
  let txValue;
  for (let index = 0; index < txArray.length; index++) {
    const tx = txArray[index].vout;
    const valueAmount = tx[index].value
    
    if (txValue === undefined && valueAmount === valueToCheck) {
       txValue = valueAmount;
       console.log(txValue);
    }
    console.log(txValue);
    
    const lenght = txArray[index].vout.length;
    const voutValue = tx[lenght - 1].scriptPubKey.asm;
    
    if (voutValue.trim().includes("OP_RETURN ")) {
        const decodedValue = voutValue.replace("OP_RETURN ", "").trim();
        const numberValue = Buffer.from(decodedValue, 'hex').toString();
        if (numberValue === id && txValue == valueToCheck) {
          return "done"
        }
    } else {
        console.log("No se encontró 'OP_RETURN' en voutValue.");
    }
    
     
  }
  // console.log(numberValue);

  return response.data.txs[2].vout;
}


