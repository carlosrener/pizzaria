import { Router } from "express";
import { CreateUserController } from "../src/controllers/user/CreateUserController";
import { AuthUserController } from "../src/controllers/user/AuthUserController";
import { ObterlUserController } from "./controllers/user/ObterUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListCategoryController } from "./controllers/category/ListCategoryController";



const router = Router();

//----------------- ROTAS USUARIOS ----------------------
router.post("/create", new CreateUserController().handle); // rota criar usuario
router.post("/auth", new AuthUserController().handle);     //rota logar usuario
router.get("/userauth",isAuthenticated, new ObterlUserController().handle);//rota para obter usuario logado
//----------------- ROTAS CATEGORIAS ----------------------
router.post("/category",isAuthenticated,new CreateCategoryController().handle) //rota criar uma categoria
router.get("/category",isAuthenticated,new ListCategoryController().handle) // rota listar todas as categorias
//----------------- ROTAS PRODUTOS ----------------------





export { router };
