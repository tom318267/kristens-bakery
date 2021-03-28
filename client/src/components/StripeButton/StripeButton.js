import React from "react";
import { withRouter } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import cupcake from "../../assets/pinkcupcake.png";
import { connect } from "react-redux";
import { clearCart } from "../../redux/cart/cart.actions";
import Swal from "sweetalert2";
import axios from "axios";

const StripeButton = ({ price, clearCart, history }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_UVobHw2eUhAXx2VMf3wBZZMt00l556a7Bs";

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
        Toast.fire({
          icon: "success",
          title: `Payment Successful`,
        });
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
