import styles from './Header.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import {Search} from "./components/Search/Search";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/UI/Button/Button";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {IAuthUser} from "@/types/IPost";
import {useGetAuthUserQuery} from "../../services/StoodoService";
import {is} from "immutable";

interface HeaderProps
{
    updateLoginModal:(value: boolean) => void,
    updateCreatePostModal:(value: boolean) => void,
}
export const Header = ({updateLoginModal, updateCreatePostModal}: HeaderProps) => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const authUser = useGetAuthUserQuery('', { skip: !isAuth }).data

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
                    {authUser !== undefined ?
                        <div className={styles.personBtn}>
                            <p>{authUser.firstName + " " + authUser.lastName}</p>
                        </div>
                    :
                        <Button className={styles.personBtn} onClick={() => updateLoginModal(true)}>
                            <img width="28" height="28"/>
                            <p>Log In</p>
                        </Button>
                    }
                </div>
            </div>
        </header>
    );
};

