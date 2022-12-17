import { Request,Response } from "express";
import { ListOrdersservice } from "../../services/order/ListOrdersService";


class ListOrdersController{
    async handle(req:Request,res:Response){

        const listOrdersSevice = new ListOrdersservice();
        const orders = await listOrdersSevice.execute();

        return res.json(orders)
    }
}
export {ListOrdersController}