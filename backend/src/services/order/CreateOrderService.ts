import prismaClient from "../../prisma";

interface OrderRequest {
  table: number;
  name: string;
}

class CreateOrderService {
  async execute({ table, name }: OrderRequest) {
    //verificar se ja existe uma mesa com o mesmo numero aberta
    const tableAlreadyExists = await prismaClient.order.findFirst({
      where: {
        table: table,
      },
    });
    //comparar os nome da categoria
    if (tableAlreadyExists) {
      throw new Error("Ja existe um Mesa aberta com esse Numero!");
    }

    const order = await prismaClient.order.create({
      data: {
        table: table,
        name: name,
      },
    });
    return order;
  }
}
export { CreateOrderService };
