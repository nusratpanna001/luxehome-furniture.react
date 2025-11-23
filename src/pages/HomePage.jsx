import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Users, Award, Shield, Truck, Headphones, Clock, ShoppingCart } from 'lucide-react';
import { LOGO_URL } from '../lib/constants';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';

function HomePage() {
  const features = [
    {
      icon: <Award className="w-12 h-12 text-amber-700" />,
      title: 'Premium Quality',
      description: 'Handcrafted furniture made with the finest materials and attention to detail.'
    },
    {
      icon: <Truck className="w-12 h-12 text-amber-700" />,
      title: 'Free Delivery',
      description: 'Complimentary delivery service within 50 miles of our showroom location.'
    },
    {
      icon: <Shield className="w-12 h-12 text-amber-700" />,
      title: 'Quality Guarantee',
      description: 'All our products come with comprehensive warranty and quality assurance.'
    },
    {
      icon: <Headphones className="w-12 h-12 text-amber-700" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist with all your furniture needs.'
    }
  ];

  const services = [
    {
      title: 'Interior Design Consultation',
      description: 'Work with our expert designers to create your dream space.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Custom Furniture Design',
      description: 'Get bespoke furniture pieces tailored to your specific requirements.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Home Staging Services',
      description: 'Professional staging services to showcase your property at its best.',
      image: 'https://images.unsplash.com/photo-1616627566495-d1bca3c91b7f?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Homeowner',
      content: 'LuxeHome transformed our living space completely. The quality and service exceeded our expectations.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      name: 'John Peterson',
      role: 'Interior Designer',
      content: 'I regularly recommend LuxeHome to my clients. Their furniture quality and design aesthetic is unmatched.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5
    },
    {
      name: 'Emily Chen',
      role: 'Restaurant Owner',
      content: 'Their commercial furniture solutions helped us create the perfect ambiance for our restaurant.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      rating: 5
    }
  ];

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Navbar (compact) */}
      <header className="px-4 md:px-8 fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 items-center py-2">
            <div className="flex items-center">
              <img src="img/logo.png" alt="logo" className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            <nav className="hidden md:flex justify-center space-x-3 text-sm">
              <Link to="/home" className="text-gray-700 hover:text-amber-700 font-medium">Home</Link>
              <Link to="/about-us" className="text-gray-700 hover:text-amber-700 font-medium">About Us</Link>
              <Link to="/products" className="text-gray-700 hover:text-amber-700 font-medium">Products</Link>
              <Link to="/contact-us" className="text-gray-700 hover:text-amber-700 font-medium">Contact Us</Link>
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
        className="relative min-h-screen flex justify-center items-center bg-cover bg-center mt-20 md:mt-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="bg-white bg-opacity-90 px-8 md:px-16 py-12 md:py-16 rounded-2xl text-center mx-4 max-w-4xl">
          <div className="flex justify-center mb-6">
            <Home className="w-16 h-16 text-amber-700" />
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-gray-900">
            Welcome to <span className="text-amber-700">LuxeHome</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Your premier destination for luxury furniture and interior design solutions. 
            We create spaces that reflect your unique style and enhance your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4">
                Explore Our Collection
              </Button>
            </Link>
            <Link to="/about-us">
              <Button variant="outline" className="border-2 border-amber-700 text-amber-700 hover:bg-amber-50 text-lg px-8 py-4">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose LuxeHome?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing exceptional furniture and unparalleled service to make your home truly luxurious.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond furniture, we offer comprehensive interior design services to transform your entire living experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <Link to="/contact-us">
                    <Button size="sm" className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-10 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about their LuxeHome experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400">★</div>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6 md:px-10 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">LuxeHome by Numbers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Over the years, we've built a reputation for excellence and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="text-5xl font-bold text-amber-500 mb-4">15+</div>
              <div className="text-xl font-medium">Years Experience</div>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="text-5xl font-bold text-amber-500 mb-4">50K+</div>
              <div className="text-xl font-medium">Happy Customers</div>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="text-5xl font-bold text-amber-500 mb-4">500+</div>
              <div className="text-xl font-medium">Furniture Designs</div>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="text-5xl font-bold text-amber-500 mb-4">98%</div>
              <div className="text-xl font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their homes with LuxeHome. 
            Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button className="bg-white text-amber-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4">
                Shop Now
              </Button>
            </Link>
            <Link to="/contact-us">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-amber-700 text-lg px-8 py-4">
                Get Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;