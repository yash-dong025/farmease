import "./Product.css";

function Product() {
  const products = [
    { id: 1, name: "Organic Wheat", price: 500, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Fresh Rice", price: 750, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Farm Vegetables", price: 300, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Milk Pack", price: 50, image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="products-container">
      <h1>🌾 Our Products</h1>
      <div className="products-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>
            <button className="btn-buy">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
