import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../ProductData/productsdata";

function ProductDetail() {
  const { id } = useParams();

  // Find product by id from your data
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ maxWidth: "300px" }} />
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>{product.description || "No description available"}</p>
      <p>Category: {product.category || "N/A"}</p>
      <p>Rating: {product.rating || "N/A"}</p>
      <p>Reviews: {product.reviews || "N/A"}</p>
      <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
     
    </div>
  );
}

export default ProductDetail;
