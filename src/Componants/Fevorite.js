
import { useFev } from "./FevContext";
import { useSearch } from "./SearchContext";
import { Link } from "react-router-dom";

export default function Favorite() {
  const { Fevitems, addfevItem, removefevItem, clearCart } = useFev();
  const { searchTerm } = useSearch();

  
  const filteredItems = Fevitems.filter((i) =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filteredItems.length) 
  {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/product" className="cta-button-sec">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-fev">
      <h2>Your Fevorite Items</h2>

      <div className="favorite-grid">
        {filteredItems.map((i) => (
          <div className="favorite-item" key={i.id}>
            <div className="favorite-card">
            
              <div className="favorite-image-container">
                <Link to={`/product/${i.id}`}>
                <img
                  src={i.image}
                  alt={i.title}
                  className="favorite-image"
                  style={{ cursor: "pointer" }} // optional, to show pointer on hover
                />
              </Link>
               
              </div>
              <h3 className="favorite-title">{i.title}</h3>{" "}
              <div className="favorite-content">
                <div className="favorite-price">${i.price.toFixed(2)}</div>
                <div>
                  <button
                    className="Fev-cart-remove"
                    onClick={() => removefevItem(i.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <button className="cta-button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}
