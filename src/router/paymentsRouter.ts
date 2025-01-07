import express from "express"
import {fluxControllers} from "../controller/paymentController"


const Router = express.Router()

Router.get("/tx", fluxControllers)


export default Router