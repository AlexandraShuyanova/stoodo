import {FC} from 'react'
import classNames from 'classnames'
import styles from "./SideBar.module.scss";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface SideBarProps {
    className?: string
    visible?: boolean
    setVisible:(vis:boolean) => any;
}
export const SideBar: FC<SideBarProps> = ({className, visible, setVisible}) => {
    const items = [
        {text: 'Home'},
        {text: 'Popular'},
        {text: 'Events'},
        {text: 'Favourites'}
    ]

    const rootClasses = [styles.sidebar, className]
    if(!visible)
    {
        rootClasses.push(styles.inactive)
    }

    const drawer = (
        <div>

        </div>
    );

    return (
        <div className={classNames(rootClasses)}>
            {/*
                <ul className={ styles.list}>
                    {items.map(el => {
                        return (
                            <li key={el.text} className={styles.item}>
                                {el.text}
                            </li>
                        )
                    })}
                </ul>*/
            }
            <List className={styles.list}>
                {['Inbox', 'Starred', 'Send email', 'Drafts', 'All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
