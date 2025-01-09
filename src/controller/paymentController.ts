import { checkTransaction } from "../service/fluxPayments"

export const fluxControllers = async (_req: any, res: any) =>{
    try {
        const id = _req.body.id;
        const value = _req.body.value;
        
        
        const response = await checkTransaction(id, value);
        
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}