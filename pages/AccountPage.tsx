import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // make sure you have firebase.ts in your root
import { useAuth } from "./AuthContext"; // from the context we made earlier
import Button from "./components/Button"; // adjust path if needed

// Optional: replace these with real Firestore data later
import { Order, SupportTicket } from "./types";

const AccountPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState<"profile" | "orders" | "support">("profile");
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

  // Example placeholders until connected to Firestore
  const orders: Order[] = [];
  const supportTickets: SupportTicket[] = [];

  if (loading) return <p>Loading...</p>;

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">Please sign in to access your account</h2>
        <a href="/login" className="btn btn-primary">
          Go to Login
        </a>
      </div>
    );

  const handleLogout = async () => {
    await signOut(auth);
  };

  const renderProfile = () => (
    <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral">My Profile</h2>
        <Button onClick={handleLogout} variant="ghost">
          Logout
        </Button>
      </div>
      <div className="space-y-3 text-lg">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.displayName && (
          <p>
            <strong>Name:</strong> {user.displayName}
          </p>
        )}
        <p>
          <strong>User ID:</strong> {user.uid}
        </p>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-6">Order History</h2>
      {orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-base-100 p-4 border border-base-300 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">Order ID: {order.id}</h3>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    order.status === "Delivered"
                      ? "bg-success text-white"
                      : order.status === "Shipped"
                      ? "bg-info text-white"
                      : "bg-warning text-neutral"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="border-t border-base-300 pt-2 mt-2">
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-sm py-1"
                  >
                    <span>
                      {item.product.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="text-right font-bold mt-2">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSupportTickets = () => (
    <div className="bg-base-100 p-6 border border-base-300 rounded-lg shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-6">Support Tickets</h2>
      {supportTickets.length === 0 ? (
        <p>You haven’t submitted any support tickets.</p>
      ) : (
        <div className="space-y-4">
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="border border-base-300 rounded-lg overflow-hidden">
              <button
                className="w-full p-4 flex justify-between items-center text-left bg-base-100 hover:bg-base-200"
                onClick={() =>
                  setExpandedTicketId(expandedTicketId === ticket.id ? null : ticket.id)
                }
              >
                <div>
                  <h3 className="font-bold text-neutral">Subject: {ticket.subject}</h3>
                  <p className="text-sm text-gray-500">
                    Ticket ID: {ticket.id} | Date: {ticket.date}
                  </p>
                </div>
                <i
                  className={`fas fa-chevron-down text-primary transition-transform duration-300 ${
                    expandedTicketId === ticket.id ? "rotate-180" : ""
                  }`}
                ></i>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedTicketId === ticket.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4 border-t border-base-300 bg-base-200/50">
                  <h4 className="font-semibold mb-2">Your Message:</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{ticket.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfile();
      case "orders":
        return renderOrders();
      case "support":
        return renderSupportTickets();
      default:
        return renderProfile();
    }
  };

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral mb-8">My Account</h1>
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-base-200 p-4 rounded-lg shadow-sm">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection("profile")}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    activeSection === "profile"
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                >
                  <i className="fas fa-user-circle w-6 mr-2"></i>
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("orders")}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    activeSection === "orders"
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                >
                  <i className="fas fa-box w-6 mr-2"></i>
                  Order History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("support")}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    activeSection === "support"
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                >
                  <i className="fas fa-life-ring w-6 mr-2"></i>
                  Support Tickets
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AccountPage;
