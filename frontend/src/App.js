import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/Home";
import AddItemPage from "./components/AddItemPage";
import SignUpFormPage from "./components/SignUpFormPage";
import UploadImage from "./components/UploadImage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
          <Route path="/offer-item">
            <AddItemPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
