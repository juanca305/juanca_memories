// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
//import {decode} from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import * as actionType from "../../constants/actionTypes";
import ReactSwitch from "react-switch";

import { GoogleLogin, googleLogout } from "@react-oauth/google";

import useStyles from "./styles";
import { ThemeContext } from "../../App";

const Navbar = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );
  //console.log("USER FROM NAVBAR", user);

  // useEffect(() => {
  //    setUser(JSON.parse(localStorage.getItem('user')));
  // }, []);

  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { theme, toggleTheme } = useContext(ThemeContext);
  // //const user = null;
  //console.log("USER FROM LOCALSTORAGE", user);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/auth");
    window.location.reload();
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    //JWT...
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div>
      <AppBar className={`navbar ${classes.appBar}`} position="static">
        <Link to="/" className={classes.brandContainer}>
          <Typography
            component={Link}
            to="/"
            className={`navbar_link ${classes.heading}`}
            variant="h2"
            align="center"
          >
            Memories <br />
            <p style={{ fontSize: "14px", color: "#ada9a9" }}>by: Juanca (07/2024)</p>
          </Typography>

          {/* <img src={memoriesText} alt="icon" height='45px'/> */}
          {/* <img
            className={classes.image}
            src={memoriesLogo}
            alt="icon"
            height="40px"
          /> */}
        </Link>

        <div className="switch_navbar">
          <Toolbar className={classes.toolbar}>
            {user ? (
              //<div>Logged In</div>

              <div className={classes.profile}>
                <Avatar
                  className={classes.purple}
                  alt={user?.result.name}
                  src={user?.result.picture}
                >
                  {user?.result.name.charAt(0)}
                </Avatar>

                <Typography
                  className={`light_fontColor ${classes.userName}`}
                  variant="h6"
                >
                  {user?.result.name.split(" ", 1)}
                </Typography>

                <Button
                  variant="contained"
                  className={classes.logout}
                  color="secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            )}
          </Toolbar>
          <div className="switch" style={{ marginRight: "30px" }}>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} onHandleColor="#ada9a9" />
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default Navbar;
