import {Header} from "@/components/Header/Header"
import {Footer} from "@/components/Footer/Footer"
import React, {FC, PropsWithChildren, useState} from "react";
import {SideBar} from "@/components/SideBar/SideBar"
import styles from "./Layout.module.scss";
import {ModalWindow} from "@/components/UI/ModalWindow/ModalWindow";
import {AuthForm} from "@/components/Header/components/AuthForm/AuthForm";
import {PostForm} from "@/components/Header/components/PostForm/PostForm";

export const Layout: FC<PropsWithChildren<{}>> = ({children}) => {

    const[loginModal, setLoginModal] = useState(false)
    const[createPostModal, setCreatePostModal] = useState(false)
    const updateLoginModal = (value:boolean) =>
    {
        setLoginModal(value);
    }

    const updateCreatePostModal = (value:boolean) =>
    {
        setCreatePostModal(value);
    }

    return (
        <div className={styles.container}>
            <ModalWindow className={styles.loginModal} visible={loginModal} setVisible={setLoginModal}>
                <AuthForm/>
            </ModalWindow>
            <ModalWindow className={styles.createPostModal} visible={createPostModal} setVisible={setCreatePostModal}>
                <PostForm/>
            </ModalWindow>
            <Header updateLoginModal={updateLoginModal} updateCreatePostModal={updateCreatePostModal}/>
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
