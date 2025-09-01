import "./App.css";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./Componants/CardContext";
import { FevProvider } from "./Componants/FevContext";
import Navbaar from "./Componants/Navbaar";
import Addtocart from "./Componants/Addtocart";
import Login from "./Componants/Login";
import Signup from "./Componants/Signup";
import Fevorite from "./Componants/Fevorite";
import { SearchProvider } from "./Componants/SearchContext"; 

import Product from "./Componants/Product";
import ProductDetail from "./Componants/Productdetail";
import Profile from "./Componants/Profile";
import EditProfile from "./Componants/Editprofile";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  return (
  <BrowserRouter>
  <SearchProvider>

    <CartProvider>
      <FevProvider>
        {isLoggedIn && <Navbaar setIsLoggedIn={setIsLoggedIn} />}

        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/product" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/addtocart" element={<Addtocart />} />
              <Route path="/Fevorite" element={<Fevorite />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/*" element={<Navigate to="/product" />} />
            </>
          )}
        </Routes>
      </FevProvider>
    </CartProvider>

  </SearchProvider>
</BrowserRouter>

  );
}

export default App;
