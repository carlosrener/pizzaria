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



export { router };

