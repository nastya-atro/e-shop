import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Route, withRouter } from 'react-router';
import s from './App.module.css'
import { NavLink } from 'react-router-dom';
import store from '../2-bll-main/redux-store';
import { BrowserRouter } from "react-router-dom";
import Store from '../../store-2-features/Store/product-1-ui/Store';
import Product from '../../store-2-features/Store/product-1-ui/Product';
import AdminAllCart from './../../store-2-features/ShopCart/1-ui-cart/AdminAllCart';
import Users from './../../store-2-features/Users/1-ui-users/Users';
import LoginPage from '../../store-2-features/Users/1-ui-users/LoginPage';
import User from '../../store-2-features/Users/1-ui-users/SingleUser';
import AgminSingleCart from '../../store-2-features/ShopCart/1-ui-cart/AdminSingleCart';
import UserCart from './../../store-2-features/ShopCart/1-ui-cart/UserCart';
import MyProfile from './../../store-2-features/Users/1-ui-users/MyProfile';
import { AppBar, Theme, createStyles, IconButton, makeStyles, Toolbar, Typography, Breadcrumbs, Button, Popper, Paper, ClickAwayListener, MenuItem, MenuList, Grow, Divider, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { isAuthSelector } from '../../store-2-features/Users/2-bll-users/UsersSelector';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    breadcrumps: {
      float: 'right',
      marginTop: '10px',
      marginRight: '60px',
      fontSize: '13px'
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


const App = () => {
  const classes = useStyles()

  const isAuth = useSelector(isAuthSelector)

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);



  return (
    <React.Fragment>

      <AppBar className={s.appbar} position="static">
        <Toolbar className={s.appbar} variant="dense">

          <div>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MenuIcon style={{ color: 'white' }} />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                        <MenuItem className={s.item_menu} onClick={handleClose}> <NavLink to='/'>
                          <HomeIcon /> <span>Catalog</span></NavLink></MenuItem>


                        <MenuItem className={s.item_menu} onClick={handleClose}> <NavLink to='/usercart'>
                          <ShoppingCartIcon /><span>Shopping cart</span></NavLink></MenuItem>


                        <MenuItem className={s.item_menu} onClick={handleClose}> <NavLink to='/profile'>
                          <PersonIcon /><span>My Profile</span> </NavLink></MenuItem>


                        {!isAuth && <MenuItem className={s.item_menu} onClick={handleClose}> <NavLink to='/login'>
                          <ExitToAppIcon /><span>Login</span></NavLink></MenuItem>}
                        <Divider />

                        <MenuItem className={s.item_menu} onClick={handleClose}> <NavLink to='/admin'>
                          <SupervisorAccountIcon /> <span>Admin profile</span></NavLink></MenuItem>

                      </MenuList>

                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <Typography className={classes.title} variant="h6" color="inherit"> Chevos`ka shop </Typography>

          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NavLink to='/usercart'> <ShoppingCartIcon style={{ color: 'white' }} /></NavLink>
            </Badge>
          </IconButton>

        </Toolbar>
      </AppBar>


      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumps}>
        <NavLink to='/' className={s.link}> Catalog </NavLink>
        <NavLink to='/profile' className={s.link} > My Profile </NavLink>
        <NavLink to='/usercart' className={s.link}> Shopping cart </NavLink>
      </Breadcrumbs>



      <Route exact path='/admin' render={() => <AdminAllCart />} />
      <Route path='/admin/cart/:Id?' render={() => <AgminSingleCart />} />
      <Route path='/usercart' render={() => <UserCart />} />
      <Route path='/users' render={() => <Users />} />
      <Route path='/login' render={() => <LoginPage />} />
      <Route exact path='/' render={() => <Store />} />
      <Route exact path='/products/:Id?' render={() => <Product />} />
      <Route exact path='/user/:Id?' render={() => <User />} />
      <Route path='/profile' render={() => <MyProfile />} />
    </React.Fragment>
  );
}




let AppC = withRouter(App)

const AppContainer = () => {
  return (
    <AppC />
  )
}

let MainApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp
