import { checkTransaction } from "../service/fluxPayments"

export const fluxControllers = async (_req: any, res: any) =>{
    try {
        const {id, amount} = _req.body;
        const response = await checkTransaction();
        
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}