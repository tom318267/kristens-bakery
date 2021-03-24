import React from "react";
import { withRouter } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import cupcake from "../../assets/pinkcupcake.png";
import { connect } from "react-redux";
import { clearCart } from "../../redux/cart/cart.actions";
import axios from "axios";

const StripeButton = ({ price, clearCart, history }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_UVobHw2eUhAXx2VMf3wBZZMt00l556a7Bs";

  console.log(price);

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((res) => {
        alert("Payment successful");
        clearCart();
        history.push("/");
      })
      .catch((error) => {
        console.error("Payment Error: ", error);
        alert(
          "There was an issue with your payment. Please make sure you use the provided credit card."
        );
      });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Kristen's Bakery"
      billingAddress
      shippingAddress
      image={cupcake}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default withRouter(connect(null, { clearCart })(StripeButton));
