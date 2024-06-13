/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import userApi from "../apis/user";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../utils/local-storage";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(null);
  const [cartUser, setCartUser] = useState(null);
  const [res, setRes] = useState();

  
  const handleLogin = async (credentials) => {
    const res = await userApi.Login(credentials);
    // setToken
    setAccessToken(res.data.accessToken);
    const getUser = await userApi.getUser();
    setIsUser(getUser.data.user);
    setRes(res.data);
    return getUser;
  };
  const handleLogout = () => {
    removeAccessToken();
    setIsUser(null);
  };

  const handleClickAddCoffeeToCart = async (productId) => {
    console.log(productId);
    const body = { quantity: 1 };
    const res = await userApi.quickAdd(productId, body);
    setRes(res.data);
  };

  const handleIncrementProductInCart = async (productAndSizeId, quantity) => {
    quantity++;
    let body = { quantity };
    const res = await userApi.addAndUpdateProduct(productAndSizeId, body);
    setRes(res.data);
  };
  const handleDecrementProductInCart = async (productAndSizeId, quantity, cartItemId) => {
    quantity--;
    if (quantity <= 0) {
      const res = await userApi.deleteProductInCart(cartItemId)
      return setRes(res.data);
    }
    let body = { quantity };
    const res = await userApi.addAndUpdateProduct(productAndSizeId, body);
    setRes(res.data);
  };

  useEffect(() => {
    const fetchCartUser = async () => {
      const resCartUser = await userApi.cartUser();
      setCartUser(resCartUser.data);
    };
    fetchCartUser();
  }, [res]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await userApi.getUser();
          setIsUser(res.data.user);
          const resCartUser = await userApi.cartUser();
          setCartUser(resCartUser.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isUser,
        handleLogin,
        handleLogout,
        handleClickAddCoffeeToCart,
        cartUser,
        handleIncrementProductInCart,
        handleDecrementProductInCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};