import React from "react";
import { Link } from "react-router-dom";
import cupcake from "../../assets/cupcake.png";
import CartIcon from "../CartIcon/CartIcon";
import CartDropdown from "../CartDropdown/CartDropdown";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import Swal from "sweetalert2";
import "./Navbar.scss";

const Navbar = ({ currentUser, hidden }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    iconColor: "#f99898",
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const signOutMessage = () => {
    Toast.fire({
      icon: "success",
      title: "You have signed out",
    });
  };

  return (
    <div className="Navbar">
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="cupcake-nav">
            <img src={cupcake} alt="cupcake" />
          </Link>
          <Link className="brand-logo">
            <CartIcon className="mobile-cart" />
          </Link>
          <Link href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/items">Menu</Link>
            </li>
            <li>
              {currentUser ? (
                <Link
                  onClick={() => {
                    auth.signOut();
                    signOutMessage();
                  }}
                >
                  Sign Out
                </Link>
              ) : (
                <Link to="/sign-in">Sign In</Link>
              )}
            </li>

            <CartIcon />
          </ul>
        </div>
        {hidden ? null : <CartDropdown />}
      </nav>

      <ul className="sidenav sidenav-close" id="mobile-demo">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/items">Menu</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Navbar);
