export default ProductCard = ({ product }) => {
    return (
      <div className="product-card">
        <div>
          <img className="product-image" src={product.thumbnail} />
        </div>
        <div className="product-title">{product.title}</div>
      </div>
    );
  };
  