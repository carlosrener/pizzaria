import prismaClient from "../../prisma";
import {hash} from 'bcryptjs'

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    // verificar se o cliente enviou um email
    if (!email) {
      throw new Error("preencha o campo email");
    }
    // verificar se esse email ja esta cadastrado
    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    //comparar os emails
    if (emailAlreadyExists) {
      throw new Error("Esse email ja está cadastrado!");
    }
    //encriptar a senha com hash
    const passwordHash = await hash(password,8)

    //cadastrar o usuario
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select:{
         id: true,
         name: true,
         email: true
      }
    });

    return user;
  }
}

export { CreateUserService };
