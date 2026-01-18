export default function ProductCard({ item, onAddToCart }) {
  return (
    <div className="productCard">
      <div className="productImage">
        <div className="imagePlaceholder">📦</div>
      </div>
      <div className="productContent">
        <h3 className="productName">{item.name}</h3>
        <p className="productDescription">{item.description}</p>
        <div className="productFooter">
          <div className="productPrice">${item.price}</div>
          <button 
            className="btn btnSuccess productBtn" 
            onClick={() => onAddToCart(item)}
            title="Add to cart"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}
