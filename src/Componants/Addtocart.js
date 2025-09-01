import { useCart } from "./CardContext";
import { Link } from "react-router-dom";
import { useSearch } from "./SearchContext";

export default function AddToCart() {
  const { items, removeItem, updateQty, subtotal, clearCart } = useCart();
  const { searchTerm } = useSearch();

  // Filter cart items by search term
  const filteredItems = items.filter((i) =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filteredItems.length) {
    return (
      <div className="cart-empty">
        <h2>No matching items in cart</h2>
        <Link to="/product" className="cta-button-sec">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-list">
        {filteredItems.map((i) => (
          <div className="cart-row" key={i.id}>

              <Link to={`/product/${i.id}`}>
                <img
                  src={i.image}
                  alt={i.title}
                  className="cart-thumb"
                  style={{ cursor: "pointer" }} // optional, to show pointer on hover
                />
              </Link>
          
            <div className="cart-title">{i.title}</div>
            <div className="cart-price">${i.price.toFixed(2)}</div>

            <div className="cart-qty">
              <button onClick={() => updateQty(i.id, i.qty - 1)}>-</button>
              <input
                type="number"
                min="1"
                value={i.qty}
                onChange={(e) =>
                  updateQty(i.id, Number(e.target.value) || 1)
                }
              />
              <button onClick={() => updateQty(i.id, i.qty + 1)}>+</button>
            </div>

            <div className="cart-line-total">
              ${(i.price * i.qty).toFixed(2)}
            </div>

            <button className="cart-remove" onClick={() => removeItem(i.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
        <button className="cta-button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}
