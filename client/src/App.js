import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Navbar from "./components/Navbar/Navbar";
import Spinner from "./components/Spinner/Spinner";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import "./App.scss";

const Homepage = lazy(() => import("./components/Homepage/Homepage"));
const BakeryItems = lazy(() => import("./components/BakeryItems/BakeryItems"));
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const Signup = lazy(() => import("./components/Signup/Signup"));

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/items" component={BakeryItems} />
                <Route exact path="/checkout" component={Checkout} />
                <Route
                  exact
                  path="/sign-in"
                  render={() =>
                    this.props.currentUser ? <Redirect to="/" /> : <Signup />
                  }
                />
              </Suspense>
            </ErrorBoundary>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, { setCurrentUser })(App);
