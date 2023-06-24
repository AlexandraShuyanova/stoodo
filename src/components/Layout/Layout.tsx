import {Header} from "@/components/Header/Header"
import {Footer} from "@/components/Footer/Footer"
import React, {FC, PropsWithChildren, useState} from "react";
import {SideBar} from "@/components/SideBar/SideBar"
import styles from "./Layout.module.scss";
import {ModalWindow} from "@/components/UI/ModalWindow/ModalWindow";
import {AuthForm} from "@/components/Header/components/AuthForm/AuthForm";

export const Layout: FC<PropsWithChildren<{}>> = ({children}) => {

    const[modal, setModal] = useState(false)
    const updateData = (value:boolean) =>
    {
        setModal(value);
    }
    return (
        <div className={styles.container}>
            <Header updateData={updateData}/>
            <ModalWindow visible={modal} setVisible={setModal}>
                <AuthForm/>
            </ModalWindow>
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
