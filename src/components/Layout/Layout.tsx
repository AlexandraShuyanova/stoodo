import {Header} from "@/components/Header/Header"
import {Footer} from "@/components/Footer/Footer"
import {FC, PropsWithChildren} from "react";
import {SideBar} from "@/components/SideBar/SideBar"
import styles from "./Layout.module.scss";

export const Layout: FC<PropsWithChildren<{}>> = ({children}) => {
    return (
        <div className={styles.container}>
           <Header/>
            <div className={styles.main}>
                <SideBar className={styles.leftSideBar}/>
                <main className={styles.postList}>
                    {children}
                </main>
                <SideBar className={styles.rightSideBar}/>
            </div>
            <Footer />
        </div>
    );
};
