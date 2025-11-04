import React, { useState } from 'react';
import { User, Order, SupportTicket, Page } from '../types';
import Button from '../components/Button';

interface AccountPageProps {
  user: User;
  orders: Order[];
  supportTickets: SupportTicket[];
  onUpdateUser: (user: User) => void;
  navigateTo: (page: Page, data?: any) => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ user, orders, supportTickets, onUpdateUser, navigateTo }) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'support'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev.address, [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const getStatusClass = (status: SupportTicket['status']) => {
    switch (status) {
        case 'Open': return 'bg-info text-white';
        case 'In Progress': return 'bg-warning text-neutral';
        case 'Closed': return 'bg-success text-white';
        default: return 'bg-gray-400 text-white';
    }
  };

  const renderProfile = () => (
    <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral">My Profile</h2>
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
      </div>
      {!isEditing ? (
        <div className="space-y-3 text-lg">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {`${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}`}</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Street</label>
            <input type="text" name="address.street" value={formData.address.street} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">City</label>
              <input type="text" name="address.city" value={formData.address.city} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">State</label>
              <input type="text" name="address.state" value={formData.address.state} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Zip Code</label>
              <input type="text" name="address.zip" value={formData.address.zip} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="ghost" onClick={handleCancel}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-6">Order History</h2>
       <div className="space-y-4">
            {orders.length > 0 ? orders.map(order => (
              <div key={order.id} className="bg-base-100 p-4 border border-base-300 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">Order ID: {order.id}</h3>
                    <p className="text-sm text-gray-500">Date: {order.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    order.status === 'Delivered' ? 'bg-success text-white' : 
                    order.status === 'Shipped' ? 'bg-info text-white' : 
                    'bg-warning text-neutral'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="border-t border-base-300 pt-2 mt-2">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between text-sm py-1">
                      <span>{item.product.name} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="text-right font-bold mt-2">
                  Total: ${order.total.toFixed(2)}
                </div>
              </div>
            )) : <p>You have not placed any orders yet.</p>}
          </div>
    </div>
  );

  const renderSupportTickets = () => (
    <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-6">Support Tickets</h2>
        <div className="space-y-4">
            {supportTickets.length > 0 ? supportTickets.map(ticket => (
                <div key={ticket.id} className="border border-base-300 rounded-lg overflow-hidden">
                    <button 
                        className="w-full p-4 flex justify-between items-center text-left bg-base-100 hover:bg-base-200"
                        onClick={() => setExpandedTicketId(expandedTicketId === ticket.id ? null : ticket.id)}
                    >
                        <div>
                            <h3 className="font-bold text-neutral">Subject: {ticket.subject}</h3>
                            <p className="text-sm text-gray-500">Ticket ID: {ticket.id} | Date: {ticket.date}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 text-sm rounded-full ${getStatusClass(ticket.status)}`}>
                                {ticket.status}
                            </span>
                             <i className={`fas fa-chevron-down text-primary transition-transform duration-300 ${expandedTicketId === ticket.id ? 'rotate-180' : ''}`}></i>
                        </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedTicketId === ticket.id ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="p-4 border-t border-base-300 bg-base-200/50">
                            <h4 className="font-semibold mb-2">Your Message:</h4>
                            <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
                        </div>
                    </div>
                </div>
            )) : <p>You have not submitted any support tickets.</p>}
        </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
        case 'profile': return renderProfile();
        case 'orders': return renderOrders();
        case 'support': return renderSupportTickets();
        default: return renderProfile();
    }
  }

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral mb-8">My Account</h1>
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-base-200 p-4 rounded-lg shadow-sm">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`w-full text-left p-3 rounded-md transition-colors ${activeSection === 'profile' ? 'bg-primary text-white' : 'hover:bg-base-300'}`}
                >
                  <i className="fas fa-user-circle w-6 mr-2"></i>
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('orders')}
                  className={`w-full text-left p-3 rounded-md transition-colors ${activeSection === 'orders' ? 'bg-primary text-white' : 'hover:bg-base-300'}`}
                >
                   <i className="fas fa-box w-6 mr-2"></i>
                  Order History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('support')}
                  className={`w-full text-left p-3 rounded-md transition-colors ${activeSection === 'support' ? 'bg-primary text-white' : 'hover:bg-base-300'}`}
                >
                   <i className="fas fa-life-ring w-6 mr-2"></i>
                  Support Tickets
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('wishlist')}
                  className={'w-full text-left p-3 rounded-md transition-colors hover:bg-base-300'}
                >
                   <i className="fas fa-heart w-6 mr-2"></i>
                  My Wishlist
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;