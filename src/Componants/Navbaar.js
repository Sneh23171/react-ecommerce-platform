import React, { useState, useRef, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "./CardContext";
import { useFev } from "./FevContext";
import { useSearch } from "./SearchContext";


function Navbaar() {
  const { items } = useCart();
  const { Fevitems } = useFev();
  const itemCount = items.length;
  const itemFevCount = Fevitems.length;
  const navigate = useNavigate();

  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();


  const navRef = useRef(null);

 

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        mobileNavActive
      ) {
        setMobileNavActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileNavActive]);

  return (
    <header>
      <nav ref={navRef}>
        <NavLink  to="/product" className="logo">
          Market<span>Store</span>
        </NavLink>

        <div className="nav-links">
          <NavLink
            to="/product"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Products
          </NavLink>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search products"
            />

          


          </div>
      

  


    
        </div>

        <div className="right">
          <NavLink
            to="/addtocart"
            end
            className={({ isActive }) =>
              `cta-button${isActive ? " active" : ""}`
            }
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M17.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M8.82 15.77c.31.75 1.04 1.23 1.85 1.23h6.18c.79 0 1.51-.47 1.83-1.2l3.24-7.4c.14-.31.11-.67-.08-.95S21.34 7 21 7H7.33L5.92 3.62C5.76 3.25 5.4 3 5 3H2v2h2.33zM19.47 9l-2.62 6h-6.18l-2.5-6z"></path>
            </svg>{" "}
            {itemCount > 0 && `(${itemCount})`}
          </NavLink>

          <NavLink
            to="/Fevorite"
            end
            className={({ isActive }) =>
              `cta-button${isActive ? " active" : ""}`
            }
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.29 20.66c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.3-2.28-5.85-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41zM5.21 6.16C6 5.38 7 4.99 8.01 4.99s2.01.39 2.79 1.17l.5.5c.39.39 1.02.39 1.41 0l.5-.5c1.56-1.56 4.02-1.56 5.59 0 1.56 1.57 1.56 4.02 0 5.58l-6.79 6.79-6.79-6.79a3.91 3.91 0 0 1 0-5.58Z"></path>
            </svg>{" "}
            {itemFevCount > 0 && `(${itemFevCount})`}
          </NavLink>

        

              <NavLink
            to="/Profile"
            end
            className={({ isActive }) =>
              `cta-button${isActive ? " active" : ""}`
            }
            aria-label="Cart"
          >
            <svg  xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
          </NavLink>
        </div>
      </nav>
      <div
        className={`mobile-nav${mobileNavActive ? " active" : ""}`}
        id="mobileNav"
      >
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search products"
          />
        </div>
        <NavLink
          to="/product"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Products
        </NavLink>

        <NavLink
          to="/Fevorite"
          className="cta-mob"
          onClick={() => setMobileNavActive(false)}
        >
          Favorite
        </NavLink>

        <a href="#" className="cta-mob">
          Logout
        </a>
      </div>
    </header>
  );
}

export default Navbaar;
