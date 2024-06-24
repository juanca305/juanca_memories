// @ts-nocheck
import React, { createContext, useEffect, useState } from "react";
import { Container, Paper } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";



import PostDetails from "./components/PostDetails/PostDetails";


export const ThemeContext = createContext(null);

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [theme, setTheme] = useState("light");

  //const client_Id = process.env.GOOGLE_PROVIDER_CLIENTID_KEY;
  

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <GoogleOAuthProvider clientId ="323739031581-dqje8qatfvboljlohila29q8f8u71fl2.apps.googleusercontent.com">
         
          <BrowserRouter>
            <Container maxWidth="xl">
              <Navbar />
              <Switch>
                <Route
                  path="/"
                  exact
                  component={() => <Redirect to="/posts" />}
                />
                <Route path="/posts" exact component={Home} />
                <Route path="/posts/search" exact component={Home} />
                <Route path="/posts/:id" component={PostDetails} />

                <Route
                  path="/auth"
                  exact
                  component={() =>
                    !user ? <Auth /> : <Redirect to="/posts" />
                  }
                />
              </Switch>
              
            </Container>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
