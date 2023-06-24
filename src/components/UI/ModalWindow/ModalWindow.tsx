import React, {FC, PropsWithChildren} from "react";
import classNames from "classnames";
import styles from "./ModalWindow.module.scss";
import {Button} from "@/components/UI/Button/Button";

interface ModalWindowProps{
    children: React.ReactNode;
    visible: boolean;
    setVisible:(vis:boolean) => any;
}
export const ModalWindow: FC<ModalWindowProps> = ({children, visible, setVisible}) => {

    const rootClasses = [styles.modal]
    const backgroundClasses = [styles.darkBackground]

    if (visible)
    {
        rootClasses.push(styles.active)
        backgroundClasses.push(styles.active)
    }

    return(
        <div>
            <div className={classNames(rootClasses)}>
                <Button className={styles.closeBtn} onClick={() => setVisible(false)}>
                    <img src={"/images/close.svg"} width="24" height="24"/>
                </Button>
                {children}
            </div>
            <div className={classNames(backgroundClasses)}>
            </div>
        </div>
    )
}