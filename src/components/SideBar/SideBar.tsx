import {FC} from 'react'
import classNames from 'classnames'
import styles from "./SideBar.module.scss";

interface SideBarProps {
    className?: string
}
export const SideBar: FC<SideBarProps> = ({className}) => {
    const items = [
        {text: 'Home'},
        {text: 'Popular'},
        {text: 'Events'},
        {text: 'Favourites'}
    ]
    return (
        <div className={classNames(styles.sidebar, className)}>
            <ul className={ styles.list}>
                {items.map(el => {
                    return (
                        <li key={el.text} className={styles.item}>
                            {el.text}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};
