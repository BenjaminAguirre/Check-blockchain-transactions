import { checkTransaction } from "../service/fluxPayments"

//ADD A TIMEOUT TO FRONT END BASED ON TIME OF {pollingInterval, maxAttempts}

// Define la interfaz para la respuesta exitosa
interface SuccessResponse {
    status: number;
    txMessage: string;
    txValue: string;
    txId: any;
    confirmations: number; // Especifica que confirmations es de tipo number
}


let attempts = 0;
const maxAttempts = 20; // Número máximo de intentos antes de responder con timeout
const pollingInterval = 10000; // 20 segundos entre intentos
export const fluxControllers = async (_req: any, res: any) => {
    try {
        const id = _req.body.id;
        const value = _req.body.value;
        console.log(id);
        console.log(value);

        const responseRaw = await checkTransaction(id, value);

        const response = (responseRaw as SuccessResponse)
        
        
       if (responseRaw) {
            res.status(200).send(responseRaw)
            return;
       }
        
        attempts++;
        if (attempts >= maxAttempts) {
            return res
                .status(408)
                .json({ message: "Timeout: transaction not found." });
        }
        setTimeout(() => fluxControllers(_req, res), pollingInterval);
    } catch (error) {
        res.status(500).send(error)
    }
}