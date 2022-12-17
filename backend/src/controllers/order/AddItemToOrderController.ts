import { Request, Response } from "express";
import { AddItemToOrderService } from "../../services/order/AddItemToOrderService";

class AddItemToOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body;

    const addItem = new AddItemToOrderService();
    const order = await addItem.execute({ order_id, product_id, amount });

    return res.json(order);
  }
}
export { AddItemToOrderController };




