"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Logo } from "../logo";
import { useRouter } from "next/navigation";
import { setIsAuth, setUser } from "@/redux/reducers/authSlice";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ModeToggle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui";
import { AuthForm } from "../auth/form-auth";
import { RegForm } from "../reg/form-reg";
import Image from "next/image";
export const MainPage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const router = useRouter();
  const username = useAppSelector((state) => state.auth.user?.login);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(setIsAuth(false));
    dispatch(
      setUser({
        login: "",
        password: "",
        token: "",
      })
    );
  };

  //   BMW СИЛА,MERSEDES МОГИЛА
  return (
    <>
      {isAuth === false ? (
        <>
          <div className="flex min-h-full items-center">
            <div className="container flex flex-col justify-center items-center min-h-screen h-full p-0 mainpageimage"></div>
            <div className="container flex flex-col justify-center items-center min-h-[700px] h-full pl-0">
              <Tabs
                defaultValue="auth"
                className="w-[400px] min-h-[400px] h-full grid"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="auth">Авторизация</TabsTrigger>
                  <TabsTrigger value="reg">Регистрация</TabsTrigger>
                </TabsList>
                <TabsContent value="auth" className="min-h-[250px] h-full">
                  <AuthForm />
                </TabsContent>
                <TabsContent value="reg" className="min-h-[250px] h-full">
                  <RegForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center flex-col justify-center bg-gray-500 w-72 h-80 rounded-lg">
            <Logo />
            <div className="flex flex-col gap-5 items-center justify-center text-center">
              <h2>Вы вошли под: {username}</h2>
              <p>Каждый час ваш пароль изменяется.</p>
              <p>Письмо с новым паролем будет приходить на вашу почту.</p>
              <button
                className="bg-white w-36 h-8 rounded-lg transition-all hover:scale-95 active:scale-90"
                onClick={() => {
                  handleLogout();
                }}
              >
                Выйти
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
