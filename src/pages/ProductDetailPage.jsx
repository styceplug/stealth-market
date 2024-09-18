import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Spinner from '../components/Spinner';
import left from '../assets/images/left.svg'
import right from '../assets/images/right.svg'
import cart from '../assets/images/cart.svg'

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {

    fetch('/products.json')
      .then(response => response.json())
      .then(data => {

        // Convert productId to string and find the product
        const foundProduct = data.find(item => item.id.toString() === productId);
        setProduct(foundProduct);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);

  if (!product) {
    return <Spinner />;
  }

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handlePrevClick = () => {
    setSelectedImage((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setSelectedImage((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="product-detail">
           <div className="slider">
        <div className="main-image">
          <img src={product.images[selectedImage]} alt={`${product.name} ${selectedImage + 1}`} />
          
          
        </div>
        <div className="thumbnails">
        <button className="nav-button prev" onClick={handlePrevClick}><img src={left} alt="" /></button>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              className={selectedImage === index ? 'active' : ''}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
          <button className="nav-button next" onClick={handleNextClick}><img src={right} alt="" /></button>
        </div>
      </div>

       <div className="text">
       <h1>{product.name}</h1>
       <p>Price: ${product.price}</p>
       <p>Summary: {product.summary}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>
      <p>Tags: {product.tags}</p>
      <p>Description: {product.description}</p>
      <button onClick={() => addToCart(product)} className='btn-cart'>Add to Cart <div className="cart"><img src={cart} alt="" /></div></button>
       </div>
    </div>
  );
};

export default ProductDetailPage;





