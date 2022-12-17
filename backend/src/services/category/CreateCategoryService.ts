import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    //verificar se ta vazio o campo
    if (name === "") {
      throw new Error("Nome invalido");
    }
    //verificar se ja existe a categoria no banco de dados
    const nameAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: name,
      },
    });
    //comparar os nome da categoria
    if (nameAlreadyExists) {
      throw new Error("Esse Categoria ja está cadastrado!");
    }
    const category = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}
export { CreateCategoryService };

