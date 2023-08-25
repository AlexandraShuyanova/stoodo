import styles from './Header.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import {Search} from "./components/Search/Search";
import {useRef, useState} from "react";
import {Button} from "@/components/UI/Button/Button";

interface HeaderProps
{
    updateLoginModal:(value: boolean) => void,
    updateCreatePostModal:(value: boolean) => void,
}
export const Header = ({updateLoginModal, updateCreatePostModal}: HeaderProps) => {

    const[modal, setModal] = useState(false)

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.sectionLeft}>
                    <Button className={styles.burger} >
                        <MenuIcon/>
                    </Button>
                    <Link className={styles.link} href='/'>
                        STOODO
                    </Link>
                </div>
                <div className={styles.sectionCenter}>
                    <Search />
                    <Button className={styles.createBtn} onClick={() => updateCreatePostModal(true)}>
                        <img src={"/images/plus-light.svg"} width="20" height="20"/>
                        Create
                    </Button>
                </div>
                <div className={styles.sectionRight}>
                    <Button className={styles.notificationsBtn}>
                        <img width="28" height="28"/>
                    </Button>
                    <Button className={styles.personBtn} onClick={() => updateLoginModal(true)}>
                        <img width="28" height="28"/>
                        <p>Log In</p>
                    </Button>
                </div>
            </div>
        </header>
    );
};

