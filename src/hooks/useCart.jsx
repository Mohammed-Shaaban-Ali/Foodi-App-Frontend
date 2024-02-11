/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  // if (user) {
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://foodi-aa6f.onrender.com/api/v1/cart?email=${user?.email}`,
        // `http://localhost:8000/api/v1/cart?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
  return [cart, refetch];
  // } else {
  //   return [];
  // }
};
export default useCart;
