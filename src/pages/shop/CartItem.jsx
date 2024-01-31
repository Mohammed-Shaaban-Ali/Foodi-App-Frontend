import React, { useContext } from "react";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import request from "../../axios/axios";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import MyImage from "./../../lazyLoadImage/MyImage";
const CartItem = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);

  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  const handledencrease = (item) => {
    const { _id, quantity } = item;
    const quantityUp = quantity - 1;
    request
      .put(`/cart/${_id}`, { quantity: quantityUp })
      .then((response) => {
        // Handle the response
        refetch();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };
  const handleIncrease = (item) => {
    const { _id, quantity } = item;
    const quantityUp = quantity + 1;
    request
      .put(`/cart/${_id}`, { quantity: quantityUp })
      .then((response) => {
        // Handle the response
        refetch();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        request
          .delete(`/cart/${item._id}`)
          .then((response) => {
            if (response) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="section-container min-h-screen">
      <div className="py-32 flex flex-col justify-center items-center gap-8">
        <div className=" space-y-8">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Items Added to The
            <span className="text-green"> Cart</span>
          </h2>
        </div>
      </div>
      {cart.length > 0 ? (
        <div>
          <div className="">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-green text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Food</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <MyImage
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{item.name}</td>
                      <td>
                        <button
                          className="btn btn-xs"
                          onClick={() => handledencrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={() => console.log(item.quantity)}
                          className="w-10 mx-2 text-center overflow-hidden appearance-none"
                        />
                        <button
                          className="btn btn-xs"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      <td>${calculateTotalPrice(item).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm border-none text-red bg-transparent"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
              </table>
            </div>
          </div>
          <hr />
          <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <p>Name: {user?.displayName || "None"}</p>
              <p>Email: {user?.email}</p>
              <p>
                User_id: <span className="text-sm">{user?.uid}</span>
              </p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Shopping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p>
                Total Price:{" "}
                <span id="total-price">${cartSubtotal.toFixed(2)}</span>
              </p>
              <button className="btn btn-md bg-green text-white px-8 py-1">
                Procceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p>Cart is empty. Please add products.</p>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-3">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItem;
