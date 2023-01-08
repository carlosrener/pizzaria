import { api } from "../services/apiClient";
import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import {toast} from 'react-toastify'


type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderprops = {
  children: ReactNode;
};

// criar context
export const AuthContext = createContext({} as AuthContextData);

//funcao para deslogar usuario
export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("erro ao deslogar");
  }
}

//criar provider do context para prover para toda aplicação
export function AuthProvider({ children }: AuthProviderprops) {
  const [user, setUser] = useState<UserProps>({ id: "", name: "", email: "" });
  const isAuthenticated = !!user;

  ////////////////////METODO DE LOGIN///////////////////////////////
  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/auth", { email, password });
      //salvar o token no cookie
      const { id, name, token } = response.data;
      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, //expira 1 mês
        path: "/", //quais caminhos terão acesso ao cookie
      });
      //passar para o user os dados
      setUser({
        id,
        email,
        name,
      });
      //passar para proximas requisições o nosso token
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      //redirecionar o user para /dashboard
      toast.success('Logado com Sucesso!')
      Router.push("/dashboard");

    } catch (error) {
      toast.error('Erro ao fazer login!')
      console.log("Error ao acessar", error);
    }
  }
  ////////////////////METODO DE CADASTRAR///////////////////////////
  async function signUp({name,email,password}:SignUpProps) {
    try {
      const response = api.post('/create',{
        name,
        email,
        password
      })
      toast.success('Conta criada com Sucesso!')
      Router.push('/')
      
    } catch (error) {
      toast.error('Erro ao Cadastrar-se!')
      console.log('erro ao cadastrar',error)
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut,signUp }}>
      {children}
    </AuthContext.Provider>
  );
}


