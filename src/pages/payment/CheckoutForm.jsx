// eslint-disable-next-line react/prop-types
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ cart, totalPrice }) => {
  const [error, seterror] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          price: totalPrice,
        })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.log(err)); //setClientSecret(data.clientSecret)
    }
  }, [axiosSecure, totalPrice]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      seterror(error.message);
    } else {
      // seterror("Success");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName || "anonymous",
            email: user.email || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        email: user.email,
        transitionId: paymentIntent.id,
        name: user.displayName,
        price: totalPrice,
        quantity: cart.length,
        itemNames: cart.map((cartItem) => cartItem.name),
        cartItems: cart.map((cartItem) => cartItem._id),
        menuItem: cart.map((cartItem) => cartItem.menuItemId),
      };
      axiosSecure.post("/payment/", paymentInfo).then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Order is Created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-start items-start gap-8">
      {/* left */}
      <div className="md:w-1/2 w-full space-y-1">
        <h4 className="text-lg font-bold">Order Summary</h4>
        <p>Total price ${totalPrice}</p>
        <p>Number og item {cart.length}</p>
      </div>

      {/* right */}
      <div className="md:w-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8">
        <h4 className="text-lg font-bold">Process your Payment</h4>
        <h5>Credit/Debit Card</h5>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm mt-5 bg-primary w-full text-white"
          >
            Pay
          </button>
        </form>
        {error && <p className="text-red text-sm">{error}</p>}
        <div className="mt-5 text-center">
          <button
            type="submit"
            className="btn btn-sm mt-5 bg-orange-500 text-white"
          >
            <FaPaypal /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
