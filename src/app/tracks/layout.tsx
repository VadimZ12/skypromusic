import Nav from "@/components/Nav/Nav";
import Player from "@/components/Player/Player";
import Search from "@/components/Search/Search";
import styles from "./layout.module.css";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), { ssr: false })

export default function TrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            {children}
          </div>
          <Sidebar />
        </main>

        <Player />

        <footer className={styles.footer} />
      </div>
    </div>
  );
}