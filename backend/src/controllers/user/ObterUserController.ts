import { Request,Response } from "express";
import { ObterUserservice } from "../../services/user/ObterUserService";

class ObterlUserController{
    async handle(req:Request,res:Response){
        const user_id = req.user_id;
        

        const obterUserService = new ObterUserservice();
        const user = await obterUserService.execute(user_id);

        return res.json(user)
    }
}

export { ObterlUserController}