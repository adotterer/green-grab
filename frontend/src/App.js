import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/Home";
import AddItemPage from "./components/AddItemPage";
import SignUpFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import ItemPage from "./components/ItemPage";
import ProfilePage from "./components/ProfilePage";
import EditItemPage from "./components/EditItemPage";
import * as sessionActions from "./store/session";

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
          <Route exact path="/offer-item">
            <AddItemPage />
          </Route>
          <Route exact path="/items/:userId/:itemId">
            <ItemPage />
          </Route>
          <Route exact path="/profile/:userId">
            <ProfilePage />
          </Route>
          <Route exact path="/items/edit/:userId/:itemId">
            <EditItemPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
