import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage'; // Import the CheckoutPage
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import AboutUsPage from './pages/AboutUsPage';
import FloatingChat from './components/FloatingChat'; // Import the floating chat component

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LandingPage />} />
      <Route path='/main' element={<MainLayout />}>
        <Route path='home' element={<HomePage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='product/:productId' element={<ProductDetailPage />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='privacy' element={<PrivacyPolicyPage />} />
        <Route path='terms' element={<TermsPage />} />
        <Route path='about-us' element={<AboutUsPage />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      {/* Place the FloatingChat outside the router structure so it is rendered on all pages */}
      <FloatingChat />
    </CartProvider>
  );
};

export default App;







