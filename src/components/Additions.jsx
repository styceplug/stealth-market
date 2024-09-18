import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import cart from '../assets/images/cart.svg';

const Additions = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // Reset page number when route changes
    setCurrentPage(1);
  }, [location.pathname]);

  const handleNextPage = () => {
    if (currentPage * productsPerPage < products.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className='additions'>
      <h1>New Additions</h1>
      <div className="products">
        {currentProducts.map(product => (
          <div key={product.id} className="product">
            <div className="item-fav"></div>
            <div className="profile" onClick={() => navigate(`/main/product/${product.id}`)}>
                <img src={product.images[0]} alt="" />
                <h3>{product.name}</h3>
            </div>

            <div className="proceed">
                <h3>${product.price}</h3>
                <button className='btn-cart' onClick={() => addToCart(product)}>
                  Add to Cart <div className="cart"><img src={cart} alt="" /></div>
                </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={currentPage * productsPerPage >= products.length}>Next</button>
      </div>
    </div>
  );
}

export default Additions;





















