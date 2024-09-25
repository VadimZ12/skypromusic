'use client'

import Link from "next/link";
import styles from "./Signin.module.css";
import classNames from "classnames";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import React, { useState } from "react";
import { signin } from "@/api/signin";
import { getToken } from "@/api/tracks";
import { useRouter } from "next/navigation";


export default function SignInPage() {
  const router = useRouter();
  const { login }: any = useUser();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSigninData({
      ...signinData,
      [name]: value,
    });
  };

  const handleSignin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const userData = await signin(signinData)
      const tokenData = await getToken(signinData)
        login(userData, tokenData);
        router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} onSubmit={handleSignin} >
            <a href="../">
              <div className={styles.modalLogo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </a>
            <input
              onChange={handleInputChange}
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="email"
              placeholder="Почта"
            />
            <input
              onChange={handleInputChange}
              className={classNames(styles.modalInput, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <p>{error}</p>
            <button type="submit" className={styles.modalBtnEnter}>
              Войти
            </button>
            <button className={styles.modalBtnSignup}>
              <Link href="/signup">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}