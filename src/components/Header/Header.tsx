import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

import styles from './Header.module.scss';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Link from 'next/link';
import {Search} from "./components/Search/Search";
import {useRef, useState} from "react";
import {Button} from "@/components/UI/Button/Button";
import {fontSize} from "@mui/system";

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts'
        })
    })
})
interface HeaderProps
{
    updateData:(value: boolean) => void;
}
export const Header = ({updateData}: HeaderProps) => {

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
                    <Button className={styles.createBtn}>
                        <img src={"/images/plus-light.svg"} width="20" height="20"/>
                        Create
                    </Button>
                </div>
                <div className={styles.sectionRight}>
                    <Button className={styles.notificationsBtn}>
                        <img src={"/images/bell.svg"} width="28" height="28"/>
                    </Button>
                    <Button className={styles.personBtn} onClick={() => updateData(true)}>
                        <img src={"/images/login.svg"} width="28" height="28"/>
                        Log In
                    </Button>
                </div>
            </div>
        </header>
    );
};

// import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import Badge from '@mui/material/Badge';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import MoreIcon from '@mui/icons-material/MoreVert';
// import styles from './Header.module.scss';
//
// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(3),
//         width: 'auto',
//     },
// }));
//
// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));
//
// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: '20ch',
//         },
//     },
// }));
//
// export const Header = () => {
//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//     const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
//         React.useState<null | HTMLElement>(null);
//
//     const isMenuOpen = Boolean(anchorEl);
//     const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
//
//     const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };
//
//     const handleMobileMenuClose = () => {
//         setMobileMoreAnchorEl(null);
//     };
//
//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         handleMobileMenuClose();
//     };
//
//     const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//         setMobileMoreAnchorEl(event.currentTarget);
//     };
//
//     const menuId = 'primary-search-account-menu';
//     const renderMenu = (
//         <Menu
//             anchorEl={anchorEl}
//             anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             id={menuId}
//             keepMounted
//             transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             open={isMenuOpen}
//             onClose={handleMenuClose}
//         >
//             <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//             <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//         </Menu>
//     );
//
//     const mobileMenuId = 'primary-search-account-menu-mobile';
//     const renderMobileMenu = (
//         <Menu
//             anchorEl={mobileMoreAnchorEl}
//             anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             id={mobileMenuId}
//             keepMounted
//             transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             open={isMobileMenuOpen}
//             onClose={handleMobileMenuClose}
//         >
//             <MenuItem>
//                 <IconButton size="large" aria-label="show 4 new mails" color="inherit">
//                     <Badge badgeContent={4} color="error">
//                         <MailIcon />
//                     </Badge>
//                 </IconButton>
//                 <p>Messages</p>
//             </MenuItem>
//             <MenuItem>
//                 <IconButton
//                     size="large"
//                     aria-label="show 17 new notifications"
//                     color="inherit"
//                 >
//                     <Badge badgeContent={17} color="error">
//                         <NotificationsIcon />
//                     </Badge>
//                 </IconButton>
//                 <p>Notifications</p>
//             </MenuItem>
//             <MenuItem onClick={handleProfileMenuOpen}>
//                 <IconButton
//                     size="large"
//                     aria-label="account of current user"
//                     aria-controls="primary-search-account-menu"
//                     aria-haspopup="true"
//                     color="inherit"
//                 >
//                     <AccountCircle />
//                 </IconButton>
//                 <p>Profile</p>
//             </MenuItem>
//         </Menu>
//     );
//
//     return (
//         <Box sx={{flexGrow: 1}}>
//             <AppBar
//                 position="fixed"
//                 sx={{backgroundColor: 'white'}}
//             >
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         aria-label="open drawer"
//                         sx={{mr: 2, color: 'black'}}
//                     >
//                         <MenuIcon/>
//                     </IconButton>
//                     <Typography
//                         variant="h6"
//                         noWrap
//                         component="div"
//                         sx={{display: {xs: 'none', sm: 'block'}, color: 'black'}}
//                     >
//                         STOODO
//                     </Typography>
//                     <Search>
//                         <SearchIconWrapper>
//                             <SearchIcon sx={{color: 'black'}}/>
//                         </SearchIconWrapper>
//                         <StyledInputBase
//                             placeholder="Search…"
//                             inputProps={{'aria-label': 'search'}}
//                             sx={{color: 'black'}}/>
//                     </Search>
//                     <Box sx={{flexGrow: 1}}/>
//                     <Box sx={{display: {xs: 'none', md: 'flex'}}}>
//                         <IconButton size="large" aria-label="show 4 new mails" sx={{color: 'black'}}>
//                             <Badge badgeContent={4} color="error">
//                                 <MailIcon/>
//                             </Badge>
//                         </IconButton>
//                         <IconButton
//                             size="large"
//                             aria-label="show 17 new notifications"
//                             color="inherit"
//                             sx={{color: 'black'}}
//                         >
//                             <Badge badgeContent={17} color="error">
//                                 <NotificationsIcon/>
//                             </Badge>
//                         </IconButton>
//                         <IconButton
//                             size="large"
//                             edge="end"
//                             aria-label="account of current user"
//                             aria-controls={menuId}
//                             aria-haspopup="true"
//                             onClick={handleProfileMenuOpen}
//                             sx={{color: 'black'}}
//                         >
//                             <AccountCircle/>
//                         </IconButton>
//                     </Box>
//                     <Box sx={{display: {xs: 'flex', md: 'none'}}}>
//                         <IconButton
//                             size="large"
//                             aria-label="show more"
//                             aria-controls={mobileMenuId}
//                             aria-haspopup="true"
//                             onClick={handleMobileMenuOpen}
//                             sx={{color: 'black'}}
//                         >
//                             <MoreIcon/>
//                         </IconButton>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             {renderMobileMenu}
//             {renderMenu}
//         </Box>
//     );
// }
