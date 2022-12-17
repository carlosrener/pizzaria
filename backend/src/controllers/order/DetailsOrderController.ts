import { Request,Response } from "express";
import { DetailsOrderService } from "../../services/order/detailsOrdersevice";

class DetailsOrderController{
    async handle(req:Request,res: Response){
        const order_id = req.query.order_id as string;
        const detailsOrderService = new DetailsOrderService();
        const detailsOrders = await detailsOrderService.execute({order_id})

        return res.json(detailsOrders)

    }
}
export {DetailsOrderController}