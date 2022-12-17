import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    //verificar se algum usuario possui o email informado
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("email ou senha incorretos");
    }
    //comparar e verificar se a senha informada ta correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("email ou senha incorretos");
    }
    //se deu tudo certo gerar um token
    //gerar um tokem  jwt e devolver os dados do usuario par provar que ele estar logado
    //JWT => payload e secret e options
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "2d",
      }
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
