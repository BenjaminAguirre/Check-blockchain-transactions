import express from "express"
import {fluxControllers} from "../controller/paymentController"


const Router = express.Router()

Router.post("/tx", fluxControllers)


export default Router