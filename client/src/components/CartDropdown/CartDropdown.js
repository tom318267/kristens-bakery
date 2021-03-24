import React from "react";
import { connect } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { withRouter } from "react-router-dom";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import "./CartDropdown.scss";

const CartDropdown = ({ cartItems, history, toggleCartHidden }) => {
  return (
    <div className="CartDropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <button
        className="checkout-button"
        onClick={() => {
          history.push("/checkout");
          toggleCartHidden();
        }}
      >
        Checkout
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(
  connect(mapStateToProps, { toggleCartHidden })(CartDropdown)
);
