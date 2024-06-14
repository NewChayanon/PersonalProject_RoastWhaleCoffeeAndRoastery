import { createBrowserRouter } from "react-router-dom";

import { RouterProvider } from "react-router-dom";
import MainContainer from "../layouts/MainContainer";
import HomePage from "../pages/HomePage";
import CoffeePage from "../pages/CoffeePage";
import ToolPage from "../pages/ToolPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { StockContextProvider } from "../contexts/StockContext";
import CheckOutPage from "../pages/ChackOutPage";
import StatusOrderUserPage from "../pages/StatusOrderUserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <HomePage /> },
      // { path: "users/:userId", element: <HomePage /> },
      {
        path: "/product-coffees",
        element: (
          <StockContextProvider>
            <CoffeePage />
          </StockContextProvider>
        ),
      },
      {
        path: "/product-tools",
        element: (
          <StockContextProvider>
            <ToolPage />
          </StockContextProvider>
        ),
      },
      { path: "/carts", element: <CartPage /> },
      { path: "/check-out", element: <CheckOutPage /> },
      { path: "/order-status", element: <StatusOrderUserPage /> },
    ],
  },
  { path: "/logins", element: <LoginPage /> },
  { path: "/registers", element: <RegisterPage /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
