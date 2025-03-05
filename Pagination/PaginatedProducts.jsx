import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default PaginatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=0");
    const data = await response.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const PageSize = 10;
  const noOfPages = Math.ceil(totalProducts / PageSize);
  const start = currentPage * PageSize;
  const end = start + PageSize;

  const handlePageChange = (index) => {
    setCurrentPage(index);
  };

  return (
    <div>
      Paginated Products
      <div className="container">
        {products.slice(start, end).map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div>
        <button
          disabled={currentPage == noOfPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          ➡️
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            key={n}
            style={{
              margin: "2px",
              cursor: "pointer",
              padding: "2px",
              border: "1px solid black",
              backgroundColor: `${currentPage == n ? "gray" : ""}`,
            }}
            onClick={() => handlePageChange(n)}
          >
            {n + 1}
          </button>
        ))}
        <button
          disabled={currentPage == 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          ⬅️
        </button>
      </div>
    </div>
  );
};
