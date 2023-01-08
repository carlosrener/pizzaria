import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
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

//criar provider do context para prover
export function AuthProvider({ children }: AuthProviderprops) {
  const [user, setUser] = useState<UserProps>({ id: "", name: "", email: "" });
  const isAuthenticated = !!user;

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
      Router.push('/dashboard')

    } catch (error) {
      console.log("Error ao acessar", error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
