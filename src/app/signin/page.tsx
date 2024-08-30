'use client'

import Link from "next/link";
import styles from "./Signin.module.css";
import classNames from "classnames";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { signin } from "@/api/signin";
import { getToken } from "@/api/tracks";

export default function SignInPage() {
  const { login }: any = useUser();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSigninData({
      ...signinData,
      [name]: value,
    });
  };

  const handleSignin = async () => {
    await signin(signinData)
      .then((data) => {
        getToken(signinData).then((tokenData) => {
          login(data, tokenData);
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
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
            <button onClick={handleSignin} className={styles.modalBtnEnter}>
              <Link href="/">Войти</Link>
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