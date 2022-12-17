import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;
 
    const createProductservice = new CreateProductService();

    //verificar antes se carregou alguma foto
    if(!req.file){
        throw new Error("Por favor carregue uma imagem")
    }else{

        const {originalname,filename: banner} = req.file;
        
        const product = await createProductservice.execute({
            name,
            price,
            description,
            banner,
            category_id,
          });
          return res.json(product)
    }

    
  }
}
export {CreateProductController}

