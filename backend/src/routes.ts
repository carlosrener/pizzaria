import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "../src/controllers/user/CreateUserController";
import { AuthUserController } from "../src/controllers/user/AuthUserController";
import { ObterlUserController } from "./controllers/user/ObterUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemToOrderController } from "./controllers/order/AddItemToOrderController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/sendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailsOrderController } from "./controllers/order/DetailsOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";









const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

//----------------- ROTAS USUARIOS ----------------------
router.post("/create", new CreateUserController().handle); // rota criar usuario
router.post("/auth", new AuthUserController().handle); //rota logar usuario
router.get("/userauth", isAuthenticated, new ObterlUserController().handle); //rota para obter usuario logado



//----------------- ROTAS CATEGORIAS ----------------------
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
); //rota criar uma categoria
router.get("/category", isAuthenticated, new ListCategoryController().handle); // rota listar todas as categorias



//----------------- ROTAS PRODUTOS --------------------------
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle // rota criar poduto
);
router.get(
  "/category/product",
  isAuthenticated,
  new ListProductByCategoryController().handle // rota filtrar produto por categoria
);

//----------------- ROTAS PRODUTOS --------------------------
router.post("/order",isAuthenticated,new CreateOrderController().handle) //rota para abrir uma mesa
router.delete("/order",isAuthenticated,new RemoveOrderController().handle) //rota para deletar mesa
router.post("/order/add",isAuthenticated,new AddItemToOrderController().handle) //adicionar item na mesa
router.delete("/order/remove",isAuthenticated,new RemoveItemController().handle) //rota para deletar um item dentro de uma mesa
router.put("/order/send",isAuthenticated,new SendOrderController().handle) //atualizar ordem
router.get("/order",isAuthenticated,new ListOrdersController().handle) // listar todas a mesas decrescente
router.get("/order/detail",isAuthenticated,new DetailsOrderController().handle); //rota listar detalhes order
router.put("/order/finish",isAuthenticated,new FinishOrderController().handle); // rota finalizar uma mesa



export { router };




