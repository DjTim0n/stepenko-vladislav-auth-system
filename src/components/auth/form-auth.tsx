"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../logo";
import { useRouter } from "next/navigation";
import { setIsAuth, setUser } from "@/redux/reducers/authSlice";
import { useAppDispatch } from "@/redux/store";
import { Button, Input, Label, useToast } from "../ui";
import { useForm } from "react-hook-form";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import type Hcaptcha from "@hcaptcha/react-hcaptcha";
export const AuthForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>("");
  const { register, handleSubmit } = useForm();
  const { toast } = useToast();
  const captchaRef = useRef<Hcaptcha>(null);

  const handleLogin = async (e: any) => {
    console.log(e);
    if (!token) {
      toast({ title: "Пройдите капчу!" });
    }
    if (!e.email && !e.password) {
      toast({ title: "Введите логин и пароль!" });
    } else if (!e.email) {
      toast({ title: "Введите логин!" });
    } else if (!e.password) {
      toast({ title: "Введите пароль!" });
    }

    if (token && e.email && e.password) {
      try {
        await axios
          .post("https://step-vlad-1337-api.vercel.app/login", {
            email: e.email,
            password: e.password,
          })
          .then((res) => {
            console.log("res: ", res);
            dispatch(
              setUser({
                login: e.email,
                password: "",
                token: res.data.access_token,
              })
            );
            dispatch(setIsAuth(true));
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (token) console.log(`hCaptcha Token: ${token}`);
  }, [token]);

  return (
    <>
      <div className="flex items-center flex-col justify-center">
        <div className="flex items-center flex-col justify-center w-[400px] h-[250px] rounded-lg">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex items-center flex-col gap-4"
          >
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                {...register("email")}
                type="text"
                placeholder="Введите Email"
              />
            </div>
            <div className="space-y-1">
              <Label>Пароль</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Введите пароль"
              />
            </div>
            <div className="space-y-2">
              <Input
                className="rounded-lg transition-all hover:scale-95 active:scale-90"
                type="submit"
                value="Войти"
              />
            </div>
            <div>
              <HCaptcha
                sitekey="a26c1c9b-b4c3-4f21-bd16-846444cbbc9b"
                onVerify={setToken}
                ref={captchaRef}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
