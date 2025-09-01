import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CardContext";
import { useFev } from "./FevContext";
import { useSearch } from "./SearchContext";
import { products } from "../ProductData/productsdata";

function Product() {
  const [filteredProducts, setFilteredProducts] = useState(products); // start with all
  const { addItem } = useCart();
  const { addfevItem } = useFev();
  const { searchTerm } = useSearch();


  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) 
     
    );
    setFilteredProducts(filtered);
  }, [searchTerm]); 

  const filterByPrice = () => {
    const filtered = products.filter(
      (product) => product.price >= 0 && product.price <= 50 
    );
    setFilteredProducts(filtered);
  };

    const filterByPricesec = () => {
    const filtered = products.filter(
      (product) => product.price >= 50 && product.price <= 100
    );
    setFilteredProducts(filtered);
  };

  return (
    <>


<div className="filter-select-container">
  <select onChange={(sneh) => {
    const value = sneh.target.value;
    if (value === "all") setFilteredProducts(products);
    else if (value === "0-50") filterByPrice();
    else if (value === "50-100") filterByPricesec();
  }}>
    <option value="all">Show All Products</option>
    <option value="0-50">Filter Price: $0 - $50</option>
    <option value="50-100">Filter Price: $50 - $100</option>
  </select>
</div>

    <div className="main-product">
   

      {filteredProducts.map((sneh) => (
        <div className="product-card" key={sneh.id}>
          <div className="product-image-container">
            <Link to={`/product/${sneh.id}`}>
              <img
                src={sneh.image}
                alt={sneh.title}
                className="product-image"
                style={{ cursor: "pointer" }}
              />
            </Link>
            <button className="favorite-icon" onClick={() => addfevItem(sneh)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 24 24"
              >
                <path d="M11.29 20.66c.2.2.45.29.71.29s.51-.1.71-.29l7.5-7.5c2.35-2.35 2.35-6.05 0-8.41-2.3-2.28-5.85-2.35-8.21-.2-2.36-2.15-5.91-2.09-8.21.2-2.35 2.36-2.35 6.06 0 8.41zM5.21 6.16C6 5.38 7 4.99 8.01 4.99s2.01.39 2.79 1.17l.5.5c.39.39 1.02.39 1.41 0l.5-.5c1.56-1.56 4.02-1.56 5.59 0 1.56 1.57 1.56 4.02 0 5.58l-6.79 6.79-6.79-6.79a3.91 3.91 0 0 1 0-5.58Z"></path>
              </svg>
            </button>
          </div>

          <div className="card-content">
            <h3 className="product-title">{sneh.title}</h3>
            <div className="product-price">${sneh.price.toFixed(2)}</div>

            <button className="add-to-cart-btn" onClick={() => addItem(sneh)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Product;
