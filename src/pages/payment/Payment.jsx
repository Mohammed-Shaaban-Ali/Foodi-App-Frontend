import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "./../../hooks/useCart";

const Payment = () => {
  const [cart] = useCart();
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = parseFloat(cartTotal.toFixed(2));
  const stripePromise = loadStripe(
    "pk_test_51Og69dFHvGpthwwM7BzKQbkFDeGejMUcyG8JPCaH6ZtL2M6irafGTu6WfDt0Fe891uuXqTcIrzpGP5WgSmOekKGq000yHh1VlF"
  );
  return (
    <div className=" section-container py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} totalPrice={totalPrice} />
      </Elements>
    </div>
  );
};

export default Payment;
