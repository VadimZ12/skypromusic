"use client";

import Link from "next/link";
import styles from "./Nav.module.css";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";

export default function Nav() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const {user, logout} = useUser();

  return (
    <nav className={styles.mainNav}>
      <Link href="/">
      <div className={styles.navLogo}>
        <Image
          src="/img/logo.png"
          alt="Логотип skypro-music"
          width={113}
          height={17}
        />
      </div>
      </Link>
      <div
        onClick={() => setIsOpened((prev) => !prev)}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpened && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            {user?.email && <li className={styles.menuItem}>
              <Link href="/tracks/favorites" className={styles.menuLink}>
                Мой плейлист
              </Link>
            </li>}
            {!user?.email ?<li className={styles.menuItem}>
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            </li> : <li className={styles.menuItem} onClick={logout}>Выйти</li>}
          </ul>
        </div>
      )}
    </nav>
  );
}