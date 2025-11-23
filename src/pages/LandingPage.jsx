import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { LOGO_URL } from '../lib/constants';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

function LandingPage() {
  const productContainerRef = useRef(null);

  const scrollProducts = (direction) => {
    if (productContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      productContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categories = [
    { name: 'Bed', image: 'img/bed.jpeg' },
    { name: 'Shelf', image: 'img/shelf.jpeg' },
    { name: 'Dressing Table', image: 'img/dressing.jpeg' },
    { name: 'Almirah', image: 'img/almirah.jpeg' },
    { name: 'Dining Set', image: 'img/dining set.jpeg' },
    { name: 'Chair', image: 'img/chair.jpeg' },
    { name: 'Sofa', image: 'img/sofa.jpeg' },
    { name: 'Bed Side Table', image: 'img/bedside.jpeg' },
    { name: 'Kids', image: 'img/kids.jpeg' },
    { name: 'Wooden sofa cum Divan', image: 'img/wooden sofa cum divan' },
  ];

  const trendingProducts = [
    {
      name: 'Platinum Velvet Accent Chair ',
      price: 244.99,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Velvet Boucle Accent Chair',
      price: 344.99,
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Shelf',
      price: 529.99,
      image: 'img/shelf.jpeg',
    },
    {
      name: 'Comfort Craft Sofa',
      price: 699.99,
      image: 'img/sofa.jpeg',
    },
    {
      name: 'Modern Dining Table Set',
      price: 789.99,
      image: 'img/dining set.jpeg',
    },
  ];

  return (
    <div className="bg-white text-gray-800 font-sans">
  {/* Navbar */}
  <header className="px-4 md:px-8 fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 items-center py-3">
            <div className="flex items-center">
              <img src="img/logo.png" alt="logo" className="w-10 h-10 md:w-14 md:h-14" />
            </div>

            <nav className="hidden md:flex justify-center space-x-4">
              <Link to="/home" className="text-gray-700 hover:text-amber-700 font-medium text-sm">Home</Link>
              <Link to="/about-us" className="text-gray-700 hover:text-amber-700 font-medium text-sm">About Us</Link>
              <Link to="/products" className="text-gray-700 hover:text-amber-700 font-medium text-sm">Products</Link>
              <Link to="/contact-us" className="text-gray-700 hover:text-amber-700 font-medium text-sm">Contact Us</Link>
            </nav>

            <div className="flex items-center justify-end space-x-2">
              <Link to="/my-cart">
                <Button size="sm" className="text-xs flex items-center p-2 bg-amber-600 text-white hover:bg-amber-700" aria-label="My Cart">
                  <ShoppingCart size={16} />
                </Button>
              </Link>

              <Link to="/login">
                <Button size="sm" className="text-xs px-3 py-1">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-[80vh] md:h-screen flex justify-center items-center bg-cover bg-center mt-16 md:mt-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="bg-white bg-opacity-70 px-6 md:px-10 py-6 md:py-8 rounded-md text-center mx-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Precise Concept Design <br className="hidden md:block" /> for Stylish Living
          </h2>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16 text-center px-4 md:px-8">
        <h3 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-10">Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden w-full">
              <img src={category.image} className="w-full h-40 md:h-48 object-cover" alt={category.name} />
              <h4 className="py-3 text-sm md:text-lg font-semibold">{category.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-gray-100 py-12 md:py-16 text-center relative overflow-hidden">
        <h3 className="text-2xl md:text-4xl font-semibold mb-4">Our Trending Products</h3>
        <p className="text-gray-600 mb-6 px-4">
          Choose what resonates with your uniqueness.
          <br className="hidden md:block" />
          Organize every space with our timeless furniture collections.
        </p>
        <Link to="/products">
          <Button className="mb-10">View All</Button>
        </Link>

        {/* Scroll Buttons (hidden on small screens) */}
        <button
          onClick={() => scrollProducts('left')}
          className="hidden lg:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-amber-700 text-white p-3 rounded-full shadow-lg hover:bg-amber-800 transition-all duration-300 z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollProducts('right')}
          className="hidden lg:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-700 text-white p-3 rounded-full shadow-lg hover:bg-amber-800 transition-all duration-300 z-10"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>

        {/* Product Cards Container */}
        <div
          ref={productContainerRef}
          className="flex gap-2 md:gap-3 px-6 md:px-8 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {trendingProducts.map((product, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg w-64 md:w-72 flex-shrink-0 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={product.image} className="w-full h-48 md:h-52 object-cover" alt={product.name} />
              <div className="p-5">
                <h4 className="font-semibold text-base md:text-lg mb-2 line-clamp-2">{product.name}</h4>
                <p className="text-gray-600 text-lg font-bold mb-3">${product.price}</p>
                <Button size="sm" className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <ShoppingCart size={16} />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="relative bg-cover bg-center py-16 md:py-20 px-4 md:px-6"
        style={{
          backgroundImage:
            "url('img/bedroom.jpeg')",
        }}
      >
        <div className="bg-black bg-opacity-60 max-w-xl mx-auto p-6 md:p-8 rounded-lg text-center text-white">
          <h4 className="text-xl md:text-2xl font-semibold mb-2">Comfort Craft Sofa</h4>
          <p className="text-sm mb-4">Get 25% OFF on modern sofa collections</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-gray-800 w-full sm:w-60"
              aria-label="Email address"
            />
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;
