import { Product, Category, User, Order, SupportTicket } from '../types';

export const mockCategories: Category[] = [
  { 
    name: 'Electronics, Computers & Office', 
    imageUrl: 'https://i.postimg.cc/Jz7D9YS6/JBL-wireless-earbuds.jpg',
    subcategories: [
      { 
        name: 'Computers & Accessories',
        subcategories: [
          { name: 'Laptops' },
          { name: 'Desktops' },
          { name: 'Monitors' },
          { name: 'Tablets' },
          { name: 'Computer Accessories' },
        ],
      },
      { 
        name: 'Phones & Accessories',
        subcategories: [
          { name: 'Smartphones' },
          { name: 'Phone Cases' },
          { name: 'Chargers & Cables' },
        ]
      },
      { 
        name: 'TV & Home Theater',
        subcategories: [
          { name: 'Televisions' },
          { name: 'Streaming Devices' },
          { name: 'Soundbars' },
        ]
      },
      { name: 'Wearable Technology' },
      { name: 'Cameras & Drones' },
    ]
  },
  { 
    name: 'Books', 
    imageUrl: 'https://picsum.photos/seed/books/400/300',
    subcategories: [
      { 
        name: 'Fiction',
        subcategories: [
            { name: 'Fantasy' },
            { name: 'Science Fiction' },
            { name: 'Mystery & Thriller' },
            { name: 'Romance' },
        ]
      },
      { name: 'Non-Fiction' },
      { name: "Children's Books" },
    ]
  },
  { 
    name: 'Home, Garden & Tools', 
    imageUrl: 'https://picsum.photos/seed/kitchen/400/300',
    subcategories: [
      { 
        name: 'Home & Kitchen',
        subcategories: [
          { name: 'Kitchen & Dining' },
          { name: 'Bedding & Bath' },
          { name: 'Furniture' },
        ]
      },
      { name: 'Home Decor' },
      { name: 'Smart Home Devices' },
    ]
  },
  { 
    name: 'Fashion', 
    imageUrl: 'https://picsum.photos/seed/fashion/400/300',
    subcategories: [
      { name: "Women's Fashion" },
      { name: "Men's Fashion" },
      { name: "Kid's Fashion" },
      { name: 'Shoes' },
      { name: 'Jewelry & Watches' },
    ]
  },
];

export const mockProducts: Product[] = [
  // Existing Products (updated with new fields)
  {
    id: 1,
    name: 'Quantum Wireless Headphones',
    description: 'Experience immersive sound with these noise-cancelling wireless headphones. Long-lasting battery and crystal-clear microphone quality.',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Computer Accessories',
    images: ['https://picsum.photos/seed/headphone1/600/600', 'https://picsum.photos/seed/headphone2/600/600', 'https://picsum.photos/seed/headphone3/600/600'],
    rating: 4.8,
    reviewCount: 1250,
    stock: 50,
    isBestseller: true,
    reviews: [
      { id: 1, author: 'Alex', rating: 5, comment: 'Amazing sound quality!', date: '2023-10-10' },
      { id: 2, author: 'Maria', rating: 4, comment: 'Very comfortable, but a bit pricey.', date: '2023-10-09' },
    ],
    brand: 'Quantum Audio',
    condition: 'New',
    seller: 'Quantum Direct',
  },
  {
    id: 2,
    name: 'Smart Home Hub X',
    description: 'Control all your smart devices from one central hub. Compatible with Alexa, Google Assistant, and Apple HomeKit.',
    price: 89.99,
    category: 'Smart Home Devices',
    images: ['https://picsum.photos/seed/hub1/600/600', 'https://picsum.photos/seed/hub2/600/600'],
    rating: 4.5,
    reviewCount: 890,
    stock: 120,
    isTrending: true,
    reviews: [{ id: 3, author: 'John Doe', rating: 5, comment: 'Works flawlessly!', date: '2023-09-15' }],
    brand: 'ConnectaHome',
    condition: 'New',
    seller: 'Tech Emporium',
  },
  {
    id: 3,
    name: 'The Alchemist',
    description: 'Paulo Coelho\'s enchanting novel has inspired a devoted following around the world.',
    price: 12.50,
    category: 'Fiction',
    images: ['https://picsum.photos/seed/book1/600/600', 'https://picsum.photos/seed/book2/600/600'],
    rating: 4.9,
    reviewCount: 25000,
    stock: 200,
    isBestseller: true,
    reviews: [{ id: 4, author: 'Jane Smith', rating: 5, comment: 'A life-changing book.', date: '2023-08-20' }],
    brand: 'HarperOne',
    condition: 'New',
    seller: 'Bookworm Deals',
  },
  {
    id: 4,
    name: 'Gourmet Espresso Machine',
    description: 'Brew cafe-quality espresso at home. Features a powerful 15-bar pump and a built-in milk frother.',
    price: 349.50,
    originalPrice: 399.99,
    category: 'Kitchen & Dining',
    images: ['https://picsum.photos/seed/espresso1/600/600', 'https://picsum.photos/seed/espresso2/600/600'],
    rating: 4.7,
    reviewCount: 450,
    stock: 30,
    isTrending: true,
    reviews: [{ id: 5, author: 'CoffeeLover', rating: 5, comment: 'Makes the best espresso!', date: '2023-10-01' }],
    brand: 'Breville',
    condition: 'New',
    seller: 'Kitchen Experts',
  },
  {
    id: 5,
    name: 'Urban Explorer Backpack',
    description: 'A stylish and durable backpack for your daily commute or weekend adventures. Water-resistant material with a padded laptop compartment.',
    price: 75.00,
    category: "Men's Fashion",
    images: ['https://picsum.photos/seed/backpack1/600/600', 'https://picsum.photos/seed/backpack2/600/600'],
    rating: 4.6,
    reviewCount: 670,
    stock: 80,
    reviews: [{ id: 6, author: 'Adventurer', rating: 4, comment: 'Good quality, but wish it had more pockets.', date: '2023-09-22' }],
    brand: 'Urban Gear',
    condition: 'New',
    seller: 'Style Co.',
  },
  {
    id: 6,
    name: 'Galaxy Puzzle (1000 Pieces)',
    description: 'Challenge yourself with this stunning 1000-piece puzzle featuring a vibrant galaxy scene. High-quality materials and a glare-free finish.',
    price: 24.99,
    category: 'Toys & Games',
    images: ['https://picsum.photos/seed/puzzle1/600/600'],
    rating: 4.8,
    reviewCount: 320,
    stock: 150,
    reviews: [{ id: 7, author: 'PuzzleMaster', rating: 5, comment: 'Beautiful and challenging!', date: '2023-09-30' }],
    brand: 'Ravensburger',
    condition: 'New',
    seller: 'Hobby Hub',
  },
  {
    id: 7,
    name: 'Pro-Grip Yoga Mat',
    description: 'Eco-friendly and non-slip yoga mat for a stable and comfortable practice. Lightweight and easy to carry.',
    price: 39.99,
    category: 'Sports & Outdoors',
    images: ['https://picsum.photos/seed/yoga1/600/600'],
    rating: 4.9,
    reviewCount: 980,
    stock: 100,
    isBestseller: true,
    reviews: [{ id: 8, author: 'YogiBear', rating: 5, comment: 'The best mat I have ever owned.', date: '2023-10-05' }],
    brand: 'Liforme',
    condition: 'New',
    seller: 'Wellness World',
  },
  {
    id: 8,
    name: 'Atomic Habits',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear.',
    price: 18.99,
    category: 'Non-Fiction',
    images: ['https://picsum.photos/seed/book3/600/600'],
    rating: 4.9,
    reviewCount: 35000,
    stock: 300,
    isTrending: true,
    reviews: [{ id: 9, author: 'Reader123', rating: 5, comment: 'Practical and effective advice.', date: '2023-10-02' }],
    brand: 'Penguin Random House',
    condition: 'New',
    seller: 'Bookworm Deals',
  },
  {
    id: 9,
    name: 'Modern Leather Jacket',
    description: 'A timeless classic, this genuine leather jacket offers both style and warmth. Perfect for any occasion.',
    price: 250.00,
    originalPrice: 299.99,
    category: "Men's Fashion",
    images: ['https://picsum.photos/seed/jacket1/600/600', 'https://picsum.photos/seed/jacket2/600/600'],
    rating: 4.7,
    reviewCount: 310,
    stock: 45,
    reviews: [],
    brand: 'Alpha Leathers',
    condition: 'New',
    seller: 'Style Co.',
  },
  {
    id: 10,
    name: 'Smart RGB LED Strip Lights',
    description: 'Transform any room with these app-controlled RGB LED strip lights. Millions of colors and syncs with music.',
    price: 35.99,
    category: 'Home Decor',
    images: ['https://picsum.photos/seed/lights1/600/600'],
    rating: 4.5,
    reviewCount: 1500,
    stock: 200,
    reviews: [],
    brand: 'Govee',
    condition: 'New',
    seller: 'Tech Emporium',
  },
  {
    id: 11,
    name: 'Adjustable Dumbbell Set',
    description: 'Save space with this adjustable dumbbell set. Quickly switch weights from 5 to 52.5 lbs. Perfect for a home gym.',
    price: 299.00,
    category: 'Sports & Outdoors',
    images: ['https://picsum.photos/seed/dumbbell1/600/600'],
    rating: 4.8,
    reviewCount: 750,
    stock: 25,
    isBestseller: true,
    reviews: [],
    brand: 'Bowflex',
    condition: 'New',
    seller: 'Fitness Fanatics',
  },
  {
    id: 12,
    name: 'Portable Bluetooth Speaker',
    description: 'Compact yet powerful Bluetooth speaker with 360-degree sound and IPX7 waterproof rating. 12-hour playtime.',
    price: 49.99,
    category: 'Computer Accessories',
    images: ['https://picsum.photos/seed/speaker1/600/600', 'https://picsum.photos/seed/speaker2/600/600'],
    rating: 4.7,
    reviewCount: 2200,
    stock: 150,
    reviews: [],
    brand: 'Anker',
    condition: 'New',
    seller: 'Tech Emporium',
  },
  {
    id: 13,
    name: 'AeroGlide 4K Drone',
    description: 'Capture stunning aerial footage with this professional 4K drone. Features obstacle avoidance and a 30-minute flight time.',
    price: 499.00,
    originalPrice: 599.00,
    category: 'Cameras & Drones',
    images: ['https://picsum.photos/seed/drone1/600/600', 'https://picsum.photos/seed/drone2/600/600'],
    rating: 4.9,
    reviewCount: 650,
    stock: 40,
    isTrending: true,
    reviews: [],
    brand: 'DJI',
    condition: 'New',
    seller: 'Gadget Galaxy',
  },
  {
    id: 14,
    name: 'Classic Leather Watch',
    description: 'A sophisticated timepiece with a genuine leather strap and stainless steel case. Water-resistant up to 50m.',
    price: 159.99,
    category: 'Jewelry & Watches',
    images: ['https://picsum.photos/seed/watch1/600/600', 'https://picsum.photos/seed/watch2/600/600'],
    rating: 4.7,
    reviewCount: 880,
    stock: 70,
    reviews: [],
    brand: 'Fossil',
    condition: 'New',
    seller: 'Timeless Trends',
  },
  {
    id: 15,
    name: 'Organic Green Tea Set',
    description: 'A curated selection of 12 premium organic green teas from around the world. The perfect gift for tea lovers.',
    price: 29.99,
    category: 'Kitchen & Dining',
    images: ['https://picsum.photos/seed/tea1/600/600'],
    rating: 4.9,
    reviewCount: 420,
    stock: 90,
    isBestseller: true,
    reviews: [],
    brand: 'Teavana',
    condition: 'New',
    seller: 'Gourmet Goods',
  },
  {
    id: 16,
    name: 'The Midnight Library',
    description: 'A novel about all the choices that go into a life well-lived, by Matt Haig.',
    price: 15.99,
    originalPrice: 26.00,
    category: 'Fantasy',
    images: ['https://picsum.photos/seed/book4/600/600'],
    rating: 4.6,
    reviewCount: 18000,
    stock: 150,
    reviews: [],
    brand: 'Viking',
    condition: 'New',
    seller: 'Bookworm Deals',
  },
  
  // New Products for Laptops Category
  {
    id: 17, name: 'ZenBook Ultra-Slim Laptop', price: 999.99, category: 'Laptops', brand: 'Asus', condition: 'New', seller: 'Tech Emporium',
    description: 'Powerful and portable with an OLED display.', images: ['https://picsum.photos/seed/laptop1/600/600'], rating: 4.8, reviewCount: 450, stock: 30, reviews: []
  },
  {
    id: 18, name: 'Spectre x360 2-in-1', price: 1249.00, category: 'Laptops', brand: 'HP', condition: 'New', seller: 'Gadget Galaxy',
    description: 'Versatile 2-in-1 laptop with a stunning design.', images: ['https://picsum.photos/seed/laptop2/600/600'], rating: 4.7, reviewCount: 320, stock: 25, reviews: []
  },
  {
    id: 19, name: 'IdeaPad Gaming 3', price: 799.50, category: 'Laptops', brand: 'Lenovo', condition: 'New', seller: 'Tech Emporium',
    description: 'Entry-level gaming laptop with great performance.', images: ['https://picsum.photos/seed/laptop3/600/600'], rating: 4.5, reviewCount: 600, stock: 50, reviews: []
  },
  {
    id: 20, name: 'MacBook Air M2', price: 1199.00, category: 'Laptops', brand: 'Apple', condition: 'New', seller: 'Apple Official',
    description: 'Incredibly thin and fast with the Apple M2 chip.', images: ['https://picsum.photos/seed/laptop4/600/600'], rating: 4.9, reviewCount: 1100, stock: 40, isBestseller: true, reviews: []
  },
  {
    id: 21, name: 'Surface Laptop 5', price: 1099.99, category: 'Laptops', brand: 'Microsoft', condition: 'New', seller: 'Microsoft Store',
    description: 'Sleek, elegant, and powerful for productivity.', images: ['https://picsum.photos/seed/laptop5/600/600'], rating: 4.6, reviewCount: 250, stock: 35, reviews: []
  },
  {
    id: 22, name: 'Chromebook Spin 713', price: 649.00, category: 'Laptops', brand: 'Acer', condition: 'New', seller: 'Gadget Galaxy',
    description: 'A premium Chromebook with a high-resolution screen.', images: ['https://picsum.photos/seed/laptop6/600/600'], rating: 4.4, reviewCount: 400, stock: 60, reviews: []
  },
  {
    id: 23, name: 'Used ThinkPad T480', price: 350.00, category: 'Laptops', brand: 'Lenovo', condition: 'Used', seller: 'PC Recyclers',
    description: 'A reliable business laptop with a great keyboard.', images: ['https://picsum.photos/seed/laptop7/600/600'], rating: 4.9, reviewCount: 800, stock: 15, reviews: []
  },

  // New Products for Monitors Category
  {
    id: 24, name: 'UltraSharp 27" 4K Monitor', price: 599.99, category: 'Monitors', brand: 'Dell', condition: 'New', seller: 'Tech Emporium',
    description: 'Stunning 4K resolution with superb color accuracy.', images: ['https://picsum.photos/seed/monitor1/600/600'], rating: 4.9, reviewCount: 780, stock: 40, isBestseller: true, reviews: []
  },
  {
    id: 25, name: 'Odyssey G7 32" Curved Gaming Monitor', price: 699.00, category: 'Monitors', brand: 'Samsung', condition: 'New', seller: 'Gadget Galaxy',
    description: 'Immersive gaming experience with 240Hz refresh rate.', images: ['https://picsum.photos/seed/monitor2/600/600'], rating: 4.7, reviewCount: 950, stock: 30, isTrending: true, reviews: []
  },
  {
    id: 26, name: 'LG 34" Ultrawide Monitor', price: 449.50, category: 'Monitors', brand: 'LG', condition: 'New', seller: 'Tech Emporium',
    description: 'Perfect for multitasking with a 21:9 aspect ratio.', images: ['https://picsum.photos/seed/monitor3/600/600'], rating: 4.6, reviewCount: 1200, stock: 50, reviews: []
  },
  {
    id: 27, name: 'BenQ 24" Professional Monitor', price: 250.00, category: 'Monitors', brand: 'BenQ', condition: 'New', seller: 'Gadget Galaxy',
    description: 'Budget-friendly monitor for creative professionals.', images: ['https://picsum.photos/seed/monitor4/600/600'], rating: 4.5, reviewCount: 550, stock: 60, reviews: []
  },
  {
    id: 28, name: 'ASUS ProArt 32" 4K Monitor', price: 899.99, category: 'Monitors', brand: 'Asus', condition: 'New', seller: 'Creative Tools Inc.',
    description: 'Calman verified monitor for content creators.', images: ['https://picsum.photos/seed/monitor5/600/600'], rating: 4.8, reviewCount: 310, stock: 20, reviews: []
  },
  {
    id: 29, name: 'ViewSonic 22" 1080p Monitor', price: 119.99, category: 'Monitors', brand: 'ViewSonic', condition: 'New', seller: 'Office Supplies Co.',
    description: 'A great value monitor for everyday use.', images: ['https://picsum.photos/seed/monitor6/600/600'], rating: 4.3, reviewCount: 2500, stock: 100, reviews: []
  },

  // New Products for Fantasy Books Category
  {
    id: 30, name: 'A Game of Thrones', price: 9.99, category: 'Fantasy', brand: 'Bantam Spectra', condition: 'New', seller: 'Bookworm Deals',
    description: 'The first book in the epic A Song of Ice and Fire series.', images: ['https://picsum.photos/seed/fantasy1/600/600'], rating: 4.7, reviewCount: 45000, stock: 200, reviews: []
  },
  {
    id: 31, name: 'The Name of the Wind', price: 14.50, category: 'Fantasy', brand: 'DAW Books', condition: 'New', seller: 'Bookworm Deals',
    description: 'The first book of The Kingkiller Chronicle by Patrick Rothfuss.', images: ['https://picsum.photos/seed/fantasy2/600/600'], rating: 4.8, reviewCount: 38000, stock: 150, isBestseller: true, reviews: []
  },
  {
    id: 32, name: 'Mistborn: The Final Empire', price: 12.99, category: 'Fantasy', brand: 'Tor Books', condition: 'New', seller: 'Bookworm Deals',
    description: 'Brandon Sanderson\'s epic fantasy masterpiece.', images: ['https://picsum.photos/seed/fantasy3/600/600'], rating: 4.9, reviewCount: 32000, stock: 180, reviews: []
  },
  {
    id: 33, name: 'The Hobbit', price: 8.99, category: 'Fantasy', brand: 'Mariner Books', condition: 'New', seller: 'Bookworm Deals',
    description: 'J.R.R. Tolkien\'s classic prelude to The Lord of the Rings.', images: ['https://picsum.photos/seed/fantasy4/600/600'], rating: 4.9, reviewCount: 65000, stock: 300, reviews: []
  },
  {
    id: 34, name: 'The Way of Kings', price: 15.99, category: 'Fantasy', brand: 'Tor Books', condition: 'New', seller: 'Bookworm Deals',
    description: 'The first book in The Stormlight Archive by Brandon Sanderson.', images: ['https://picsum.photos/seed/fantasy5/600/600'], rating: 4.9, reviewCount: 41000, stock: 120, reviews: []
  },
  {
    id: 35, name: 'Good Omens', price: 11.99, category: 'Fantasy', brand: 'William Morrow', condition: 'New', seller: 'Bookworm Deals',
    description: 'A hilarious novel by Terry Pratchett and Neil Gaiman.', images: ['https://picsum.photos/seed/fantasy6/600/600'], rating: 4.7, reviewCount: 29000, stock: 160, reviews: []
  },

  // More Products for Smartphones
  {
    id: 36, name: 'Pixel 8 Pro', price: 999.00, category: 'Smartphones', brand: 'Google', condition: 'New', seller: 'Google Store',
    description: 'The most advanced Pixel camera ever.', images: ['https://picsum.photos/seed/phone1/600/600'], rating: 4.8, reviewCount: 1500, stock: 80, reviews: []
  },
  {
    id: 37, name: 'iPhone 15 Pro', price: 1099.00, category: 'Smartphones', brand: 'Apple', condition: 'New', seller: 'Apple Official',
    description: 'Forged in titanium, with the powerful A17 Pro chip.', images: ['https://picsum.photos/seed/phone2/600/600'], rating: 4.9, reviewCount: 2200, stock: 100, isBestseller: true, reviews: []
  },
  {
    id: 38, name: 'Galaxy S24 Ultra', price: 1299.99, category: 'Smartphones', brand: 'Samsung', condition: 'New', seller: 'Samsung Official',
    description: 'Unleash new levels of creativity and productivity.', images: ['https://picsum.photos/seed/phone3/600/600'], rating: 4.8, reviewCount: 1800, stock: 70, reviews: []
  },
  {
    id: 39, name: 'OnePlus 12', price: 799.00, category: 'Smartphones', brand: 'OnePlus', condition: 'New', seller: 'Tech Emporium',
    description: 'The return of the flagship killer with a Hasselblad camera.', images: ['https://picsum.photos/seed/phone4/600/600'], rating: 4.7, reviewCount: 900, stock: 50, reviews: []
  },
  {
    id: 40, name: 'Used iPhone 13', price: 550.00, category: 'Smartphones', brand: 'Apple', condition: 'Used', seller: 'PC Recyclers',
    description: 'A great value iPhone in excellent condition.', images: ['https://picsum.photos/seed/phone5/600/600'], rating: 4.9, reviewCount: 3500, stock: 40, reviews: []
  },
  {
    id: 41, name: 'Moto G Stylus 2023', price: 199.99, category: 'Smartphones', brand: 'Motorola', condition: 'New', seller: 'Gadget Galaxy',
    description: 'A budget-friendly phone with a built-in stylus.', images: ['https://picsum.photos/seed/phone6/600/600'], rating: 4.4, reviewCount: 1200, stock: 120, reviews: []
  },

  // More Products for Kitchen & Dining
  {
    id: 42, name: 'Instant Pot Duo 7-in-1', price: 89.99, category: 'Kitchen & Dining', brand: 'Instant Pot', condition: 'New', seller: 'Kitchen Experts',
    description: 'Pressure cooker, slow cooker, rice cooker, and more.', images: ['https://picsum.photos/seed/kitchen1/600/600'], rating: 4.8, reviewCount: 85000, stock: 150, isBestseller: true, reviews: []
  },
  {
    id: 43, name: 'Ninja Air Fryer XL', price: 129.99, category: 'Kitchen & Dining', brand: 'Ninja', condition: 'New', seller: 'Kitchen Experts',
    description: 'Crisp and cook your favorite foods with less oil.', images: ['https://picsum.photos/seed/kitchen2/600/600'], rating: 4.9, reviewCount: 45000, stock: 100, reviews: []
  },
  {
    id: 44, name: 'Lodge Cast Iron Skillet', price: 24.99, category: 'Kitchen & Dining', brand: 'Lodge', condition: 'New', seller: 'Gourmet Goods',
    description: 'A pre-seasoned skillet for a lifetime of cooking.', images: ['https://picsum.photos/seed/kitchen3/600/600'], rating: 4.7, reviewCount: 65000, stock: 200, reviews: []
  },
  {
    id: 45, name: 'Vitamix Explorian Blender', price: 349.95, category: 'Kitchen & Dining', brand: 'Vitamix', condition: 'New', seller: 'Wellness World',
    description: 'Professional-grade blender for smoothies, soups, and more.', images: ['https://picsum.photos/seed/kitchen4/600/600'], rating: 4.9, reviewCount: 12000, stock: 30, reviews: []
  },
  {
    id: 46, name: 'Corelle Dinnerware Set', price: 49.99, category: 'Kitchen & Dining', brand: 'Corelle', condition: 'New', seller: 'Home Essentials',
    description: '18-piece, chip-resistant dinnerware set for 6.', images: ['https://picsum.photos/seed/kitchen5/600/600'], rating: 4.6, reviewCount: 22000, stock: 80, reviews: []
  },
  {
    id: 47, name: 'Keurig K-Classic Coffee Maker', price: 109.99, category: 'Kitchen & Dining', brand: 'Keurig', condition: 'New', seller: 'Kitchen Experts',
    description: 'Brews a perfect cup of coffee in under a minute.', images: ['https://picsum.photos/seed/kitchen6/600/600'], rating: 4.5, reviewCount: 55000, stock: 120, reviews: []
  },
  {
    id: 48, name: 'Cuisinart 12-Piece Cookware Set', price: 199.99, originalPrice: 249.99, category: 'Kitchen & Dining', brand: 'Cuisinart', condition: 'New', seller: 'Home Essentials',
    description: 'Stainless steel cookware set for all your kitchen needs.', images: ['https://picsum.photos/seed/kitchen7/600/600'], rating: 4.7, reviewCount: 9500, stock: 60, reviews: []
  },
  {
    id: 49, name: 'Simple Modern Water Bottle', price: 19.99, category: "Women's Fashion", brand: 'Simple Modern', condition: 'New', seller: 'Style Co.',
    description: 'Insulated stainless steel water bottle with straw lid.', images: ['https://picsum.photos/seed/bottle1/600/600'], rating: 4.9, reviewCount: 110000, stock: 300, reviews: []
  },
  {
    id: 50, name: 'Ergonomic Office Chair', price: 219.99, originalPrice: 279.99, category: 'Furniture', brand: 'ErgoChair', condition: 'New', seller: 'Office Supplies Co.',
    description: 'Adjustable mesh office chair with lumbar support.', images: ['https://picsum.photos/seed/chair1/600/600'], rating: 4.6, reviewCount: 4500, stock: 50, reviews: []
  },
  {
    id: 51, name: 'Dune by Frank Herbert', price: 10.99, category: 'Science Fiction', brand: 'Ace Books', condition: 'New', seller: 'Bookworm Deals',
    description: 'The landmark science fiction epic.', images: ['https://picsum.photos/seed/scifi1/600/600'], rating: 4.8, reviewCount: 28000, stock: 180, reviews: []
  },
  {
    id: 52, name: 'Sony WH-1000XM5 Headphones', price: 399.00, category: 'Computer Accessories', brand: 'Sony', condition: 'New', seller: 'Sony Official',
    description: 'Industry-leading noise canceling headphones.', images: ['https://picsum.photos/seed/headphone4/600/600'], rating: 4.9, reviewCount: 5500, stock: 60, isBestseller: true, reviews: []
  }
];


export const mockUser: User = {
    id: 1,
    name: 'Jessica Jones',
    email: 'jessica.j@example.com',
    address: {
        street: '123 Main St',
        city: 'Metropolis',
        state: 'NY',
        zip: '10001',
    }
};

export const mockOrders: Order[] = [
    {
        id: 'NXR-12345',
        date: '2023-10-15',
        total: 274.99,
        status: 'Shipped',
        items: [
            { product: mockProducts.find(p => p.id === 1)!, quantity: 1, price: 199.99 },
            { product: mockProducts.find(p => p.id === 5)!, quantity: 1, price: 75.00 },
        ]
    },
    {
        id: 'NXR-12344',
        date: '2023-09-20',
        total: 52.49,
        status: 'Delivered',
        items: [
            { product: mockProducts.find(p => p.id === 6)!, quantity: 1, price: 24.99 },
            { product: mockProducts.find(p => p.id === 3)!, quantity: 2, price: 12.50 },
        ]
    },
];

export const mockSupportTickets: SupportTicket[] = [
    {
        id: 'TKT-78901',
        orderId: 'NXR-12345',
        subject: 'Question about my recent order',
        message: 'Hi, I was wondering when my Quantum Wireless Headphones will arrive. The tracking hasn\'t updated in a few days.',
        date: '2023-10-18',
        status: 'In Progress',
    },
    {
        id: 'TKT-78902',
        subject: 'Return request for puzzle',
        orderId: 'NXR-12344',
        message: 'I would like to return the Galaxy Puzzle I bought. It was a gift, but they already had one.',
        date: '2023-09-25',
        status: 'Closed',
    }
];