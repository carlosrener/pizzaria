import prismaClient from "../../prisma";

interface ProductRequest {
  category_id: string;
}

class ListProductByCategoryService {
  async execute({ category_id }: ProductRequest) {
    const findProductByCategory = await prismaClient.product.findMany({
      where: {
        categoty_id: category_id,
      },
    });
    return findProductByCategory;
  }
}
export { ListProductByCategoryService };
