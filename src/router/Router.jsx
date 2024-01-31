import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateUser from "../pages/user/UpdateUser";
import CartItem from "../pages/shop/CartItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/update-profile",
        element: <UpdateUser />,
      },
      {
        path: "/cart-item",
        element: <CartItem />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
