import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateUser from "../pages/user/UpdateUser";
import CartItem from "../pages/shop/CartItem";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/dashboard";
import Users from "../pages/dashboard/Users";
import Login from "../components/Login";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import AddMenu from "../pages/dashboard/AddMenu";

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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      // {
      //   path: "manage-items",
      //   element: <ManageItems/>
      // },
      // {
      //   path: "update-menu/:id",
      //   element: <UpdateMenu/>,
      //   loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
      // }
    ],
  },
]);

export default router;
