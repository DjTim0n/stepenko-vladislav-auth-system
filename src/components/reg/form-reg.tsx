"use client";

import axios from "axios";
import { useState } from "react";
import { Logo } from "../logo";
import { useRouter } from "next/navigation";
import { setIsAuth, setUser } from "@/redux/reducers/authSlice";
import { useAppDispatch } from "@/redux/store";
import {
  DatePicker,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label,
  useToast,
} from "../ui";
import { useForm } from "react-hook-form";

export const RegForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verifyMode, setVerifyMode] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [email, setEmail] = useState("");
  const { register, handleSubmit } = useForm();
  const { toast } = useToast();
  const handleReg = async (e: any) => {
    if (e.password != e.password_verify) {
      toast({ title: "Пароли не совпадают!" });
    }

    if (!e.email && !e.password) {
      toast({ title: "Введите логин и пароль!" });
    } else if (!e.email) {
      toast({ title: "Введите логин!" });
    } else if (!e.password) {
      toast({ title: "Введите пароль!" });
    }
    setEmail(e.email);
    try {
      const response = await axios.post("http://localhost:8000/register", {
        email: e.email,
        password: e.password,
        firstName: e.firstname,
        lastName: e.lastName,
      });
      if (response.status === 200) {
        setVerifyMode(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async (e: any) => {
    e.preventDefault();
    const verify_code = parseInt(verifyCode);
    try {
      await axios
        .post("http://localhost:8000/verify_user", {
          email: email,
          verify_code: verify_code,
        })
        .then((res) => {
          dispatch(
            setUser({
              login: email,
              password: "",
              token: res.data.access_token,
            })
          );
          dispatch(setIsAuth(true));
        });
    } catch (error) {
      console.error("🚀 ~ handleVerify ~ error:", error);
    }
  };

  return (
    <>
      {verifyMode === false ? (
        <div className="flex items-center flex-col justify-center">
          <div className="flex items-center flex-col justify-center w-[400px] h-[250px] rounded-lg">
            <form
              onSubmit={handleSubmit(handleReg)}
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
              <div className="flex flex-row gap-4">
                <div>
                  <Label>Имя</Label>
                  <Input
                    {...register("firstname")}
                    type="text"
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <Label>Фамилия</Label>
                  <Input
                    {...register("lastname")}
                    type="text"
                    placeholder="Введите ваше фамилию"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div>
                  <Label>Пароль</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Введите пароль"
                  />
                </div>
                <div>
                  <Label>Подтвердите пароль</Label>
                  <Input
                    {...register("password_verify")}
                    type="password"
                    placeholder="Введите пароль"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Input
                  className="rounded-lg transition-all hover:scale-95 active:scale-90"
                  type="submit"
                  value={"Зарегистрироваться"}
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col justify-center">
          <div className="flex items-center flex-col justify-center w-[400px] h-[250px] rounded-lg">
            <form
              onSubmit={handleVerify}
              className="flex items-center flex-col gap-4"
            >
              <InputOTP
                maxLength={6}
                value={verifyCode}
                onChange={(value) => {
                  setVerifyCode(value);
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Input
                className="rounded-lg transition-all hover:scale-95 active:scale-90"
                type="submit"
                value={"Отправить код подтверждения"}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};
