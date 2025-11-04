import React, { useContext } from 'react';
import { Page, CartContextType } from '../types';
import { CartContext } from '../App';
import Button from '../components/Button';

interface CartPageProps {
  navigateTo: (page: Page) => void;
}

const CartPage: React.FC<CartPageProps> = ({ navigateTo }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useContext(CartContext) as CartContextType;

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
        <h1 className="text-3xl font-bold text-neutral mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={() => navigateTo('home')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral mb-8">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="flex flex-col sm:flex-row items-center bg-base-100 p-4 border border-base-300 rounded-lg shadow-sm gap-4">
              <img src={item.product.images[0]} alt={item.product.name} className="w-32 h-32 sm:w-24 sm:h-24 object-cover rounded-md" />
              <div className="flex-grow self-stretch sm:self-center flex flex-col">
                <h2 className="font-semibold text-lg text-neutral">{item.product.name}</h2>
                <p className="text-sm text-gray-500">{item.product.category}</p>
                <p className="font-bold text-primary mt-1">${item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-3 self-end sm:self-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value, 10))}
                  className="w-16 text-center border border-base-300 rounded-md py-1"
                />
                <button onClick={() => removeFromCart(item.product.id)} className="text-gray-500 hover:text-error transition-colors">
                  <i className="fas fa-trash-alt text-lg"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-base-200 p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-2xl font-bold text-neutral mb-6">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="border-t border-base-300 my-3"></div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Button size="lg" className="w-full mt-6" onClick={() => navigateTo('checkout')}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;