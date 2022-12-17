import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoadJwt {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //receber o token JWT
  const authToken = req.headers.authorization;
  //verificar se mandou o tokem
  if (!authToken) {
    return res.status(401).end();
  }
  //dividir a palavra Bearer do token
  const [,token] = authToken.split(" ");

  //validar o token compando-o usando o verify e pegar o id do usuario no sub
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoadJwt;
    //criar a variavel user_id e colocar dentro da request
    req.user_id = sub;
    
    return next()
  } catch (error) {
    return res.status(401).end();
  }
}
