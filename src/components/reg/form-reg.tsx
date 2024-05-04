"use client";

import axios from "axios";
import { useState } from "react";
import { Logo } from "../logo";
import { useRouter } from "next/navigation";
import { setIsAuth, setUser } from "@/redux/reducers/authSlice";
import { useAppDispatch } from "@/redux/store";
import Link from "next/link";
import { Input, Label, useToast } from "../ui";
import { useForm } from "react-hook-form";

export const RegForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const { toast } = useToast();
  const handleReg = async (e: any) => {};

  return (
    <>
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
                value={"Зарегистрироваться"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
