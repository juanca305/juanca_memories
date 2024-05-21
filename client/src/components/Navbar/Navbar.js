// @ts-nocheck
import React, { useState, useEffect } from "react";
import { AppBar,Toolbar,Typography, Button, Avatar } from "@material-ui/core";
import memories from '../../images/memories.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
//import {decode} from 'jwt-decode';
import {jwtDecode} from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';

import { GoogleLogin, googleLogout } from "@react-oauth/google";

import useStyles from "./styles";


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) || null);
  console.log('USER FROM NAVBAR', user);

  // useEffect(() => {
  //    setUser(JSON.parse(localStorage.getItem('user')));
  // }, []);
  
   const classes = useStyles();
   
   const dispatch = useDispatch();
   const history = useHistory();
   const location = useLocation();
  // //const user = null;
   console.log('USER FROM LOCALSTORAGE', user);

  const logout = () => {
    dispatch({ type: 'LOGOUT'});
    history.push('/');
    setUser(null);
  }

  useEffect(() => {
   const token = user?.token;

   if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < new Date().getTime()) logout();
   }

   //JWT...
   setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location]);


  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
            Memories
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="60"
          />
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
              //<div>Logged In</div>

                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>
                        {user?.result.name.charAt(0)}
                        
                    </Avatar>
                    <Typography className={classes.userName} variant="h6">
                        {user?.result.name}
                        
                    </Typography>
                    <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                 <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
               
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
