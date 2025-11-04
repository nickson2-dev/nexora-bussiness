import React, { useState, useMemo } from 'react';
import Button from '../components/Button';

const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order status from the 'My Account' page. Once your order has shipped, you will receive an email with a tracking number and a link to the carrier's website."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. The item must be in its original condition and packaging. To initiate a return, please visit the 'Order History' section in your account and select the order you wish to return."
  },
  {
    question: "How can I change my shipping address?",
    answer: "If your order has not yet shipped, you can update your shipping address from the 'My Account' page. If the order is already in transit, please contact customer support for assistance."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Nexora gift cards. All transactions are secure and encrypted."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days. We also offer expedited 2-day shipping and overnight shipping options at checkout for an additional fee."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 100 countries worldwide. International shipping rates and times vary by destination. Please proceed to checkout to see the available options for your location."
  }
];

interface FAQItemProps {
    faq: { question: string; answer: string };
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-base-300">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-base-200"
            >
                <span className="font-semibold text-lg text-neutral">{faq.question}</span>
                <i className={`fas fa-chevron-down text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="p-4 text-gray-700 bg-base-100">{faq.answer}</p>
            </div>
        </div>
    );
};

interface CustomerServicePageProps {
  onCreateTicket: (ticketData: { subject: string, message: string }) => void;
}

const CustomerServicePage: React.FC<CustomerServicePageProps> = ({ onCreateTicket }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [ticketData, setTicketData] = useState({ subject: '', message: '' });

    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => 
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleFaqClick = (index: number) => {
        setActiveFaqIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const handleTicketSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreateTicket(ticketData);
        setFormSubmitted(true);
        setTicketData({ subject: '', message: '' }); // Reset form
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTicketData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="space-y-12">
            <div className="text-center bg-base-100 p-8 rounded-lg shadow-md">
                <h1 className="text-3xl sm:text-4xl font-bold text-neutral mb-2">Customer Service & Help Center</h1>
                <p className="text-lg text-gray-600">We're here to help. Find answers to your questions below.</p>
            </div>

            {/* Search and Quick Topics */}
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
                 <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search for help..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full text-lg p-4 pl-12 border border-base-300 rounded-full focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
                 <h2 className="text-2xl font-bold text-neutral mb-4 text-center">Quick Help Topics</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-base-200 rounded-lg hover:bg-base-300 cursor-pointer">
                        <i className="fas fa-box-open text-3xl text-primary mb-2"></i>
                        <h3 className="font-semibold">Your Orders</h3>
                    </div>
                     <div className="p-4 bg-base-200 rounded-lg hover:bg-base-300 cursor-pointer">
                        <i className="fas fa-shipping-fast text-3xl text-primary mb-2"></i>
                        <h3 className="font-semibold">Shipping & Delivery</h3>
                    </div>
                     <div className="p-4 bg-base-200 rounded-lg hover:bg-base-300 cursor-pointer">
                        <i className="fas fa-undo-alt text-3xl text-primary mb-2"></i>
                        <h3 className="font-semibold">Returns & Refunds</h3>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-4">Frequently Asked Questions</h2>
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                        <FAQItem 
                            key={index}
                            faq={faq}
                            isOpen={activeFaqIndex === index}
                            onClick={() => handleFaqClick(index)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">No results found for "{searchTerm}".</p>
                )}
            </div>
            
            {/* Contact Us */}
             <div className="bg-base-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-4">Still need help?</h2>
                <p className="text-gray-600 mb-6">If you can't find the answer you're looking for, please submit a support ticket below.</p>
                {formSubmitted ? (
                    <div className="text-center p-8 bg-success/10 border border-success rounded-lg">
                        <i className="fas fa-check-circle text-4xl text-success mb-3"></i>
                        <h3 className="text-2xl font-bold text-neutral">Thank You!</h3>
                        <p className="text-gray-700">Your support ticket has been created. Our team will get back to you within 24 hours. You can view your ticket in the 'My Account' section.</p>
                    </div>
                ) : (
                    <form onSubmit={handleTicketSubmit} className="space-y-4">
                        <input 
                            type="text" 
                            name="subject"
                            placeholder="Subject" 
                            value={ticketData.subject}
                            onChange={handleFormChange}
                            className="w-full p-3 border border-base-300 rounded-md" required 
                        />
                        <textarea 
                            name="message"
                            placeholder="Please describe your issue in detail..." 
                            rows={6}
                            value={ticketData.message}
                            onChange={handleFormChange} 
                            className="w-full p-3 border border-base-300 rounded-md" required
                        ></textarea>
                        <Button type="submit" size="lg">Submit Ticket</Button>
                    </form>
                )}
            </div>

        </div>
    );
};

export default CustomerServicePage;