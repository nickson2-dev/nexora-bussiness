
import React, { useContext } from 'react';
import { Page, CartContextType } from '../types';
import { CartContext } from '../App';
import Button from '../components/Button';

interface CheckoutPageProps {
  navigateTo: (page: Page) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ navigateTo }) => {
  const { cartTotal, cartCount, clearCart } = useContext(CartContext) as CartContextType;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process payment and create an order.
    // Here we just clear the cart and navigate to a success page (or home).
    alert('Order placed successfully! (This is a simulation)');
    clearCart();
    navigateTo('home');
  };
  
  return (
    <div>
      <h1 className="text-4xl font-bold text-neutral mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form className="space-y-8" onSubmit={handlePlaceOrder}>
            {/* Shipping Information */}
            <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-neutral mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="p-2 border rounded" required />
                <input type="text" placeholder="Last Name" className="p-2 border rounded" required />
                <input type="email" placeholder="Email Address" className="p-2 border rounded md:col-span-2" required />
                <input type="text" placeholder="Address" className="p-2 border rounded md:col-span-2" required />
                <input type="text" placeholder="City" className="p-2 border rounded" required />
                <input type="text" placeholder="State / Province" className="p-2 border rounded" required />
                <input type="text" placeholder="Zip / Postal Code" className="p-2 border rounded" required />
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-neutral mb-4">Payment Information (Placeholder)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Card Number" className="p-2 border rounded md:col-span-2" />
                <input type="text" placeholder="Name on Card" className="p-2 border rounded md:col-span-2" />
                <input type="text" placeholder="Expiration Date (MM/YY)" className="p-2 border rounded" />
                <input type="text" placeholder="CVV" className="p-2 border rounded" />
              </div>
            </div>
             <Button size="lg" type="submit">Place Order</Button>
          </form>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
