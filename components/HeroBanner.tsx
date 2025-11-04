import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: 'https://i.postimg.cc/cJnsjQ12/Must-Have-Tech-gadgets.jpg',
    subtitle: 'Shop the latest trends in electronics, fashion, and more. Unbeatable prices, unmatched quality.',
  },
  {
    image: 'https://i.postimg.cc/Jz7D9YS6/JBL-wireless-earbuds.jpg',
    title: 'Bestsellers of the Week',
    subtitle: 'Explore our top-rated products loved by customers worldwide. Don\'t miss out on these deals!',
  },
  {
    image: 'https://i.postimg.cc/6Q92xjS1/5-Things-To-Consider-Before-Buying-A-Wireless-Bluetooth-Speaker.jpg',
    title: 'New Arrivals',
    subtitle: 'Fresh picks and new collections have just landed. Be the first to own the next big thing.',
  }
];

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-lg shadow-lg overflow-hidden text-white min-h-[300px] sm:min-h-[400px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-8 md:p-16">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>{slide.title}</h1>
              <p className="text-md sm:text-lg md:text-xl mb-6 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>{slide.subtitle}</p>
              <button className="bg-secondary hover:bg-secondary-focus text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;