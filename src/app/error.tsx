'use client';

import { useEffect } from 'react';
import styles from "./error.module.css";
import Image from "next/image";

type ErrorType = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    // Логирование ошибки
    console.error(error);
  }, [error]);

  return (
    <div className={styles.block}>
       <Image
       className={styles.logo}
          src="/img/reactor.png"
          alt="logo"
          width={120}
          height={120}
        />
      <h2 className={styles.blink}>Что-то пошло не так!</h2>
      <button className={styles.button} onClick={reset}>Попробовать снова</button>
    </div>
  );
}