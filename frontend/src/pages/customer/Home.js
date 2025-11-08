import { Link } from "react-router-dom";

const Home = () => {
  // Navigation cards data with improved image handling
  const navItems = [
    {
      title: "Our Rooms",
      description: "Experience comfort in our Deluxe, Standard, and Suite accommodations.",
      image: "/images/room1.jpg",
      fallbackImage: "/images/hotel-exterior.jpg",
      link: "/rooms"
    },
    {
      title: "Restaurant & Bar",
      description: "Savor exquisite dishes from our diverse culinary offerings.",
      image: "/images/restaurant.jpg",
      fallbackImage: "/images/dish1.jpg",
      link: "/dining"
    },
    {
      title: "Banquet Hall",
      description: "Host memorable events in our elegant banquet halls.",
      image: "/images/banquet1.jpg",
      fallbackImage: "/images/room1.jpg",
      link: "/banquet"
    },
    {
      title: "About Our Hotel",
      description: "Discover our rich history and commitment to excellence.",
      image: "/images/About Us.webp",
      fallbackImage: "/images/room2.jpg",
      link: "/about"
    },
    {
      title: "Contact Us",
      description: "Get in touch with our friendly staff for any inquiries.",
      image: "/images/Contact Us.jpeg",
      fallbackImage: "/images/room2.jpg",
      link: "/contact"
    },
    {
      title: "Special Packages",
      description: "Exclusive deals for your perfect stay experience.",
      image: "/images/special packages.jpeg",
      fallbackImage: "/images/room2.jpg",
      link: "/offers"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-banner d-flex align-items-center" style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/room2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "60vh",
        color: "#fff",
        position: "relative"
      }}>
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">Welcome to Hotel Grand Regal</h1>
          <p className="lead mb-5">Experience luxury, comfort, and exceptional hospitality in the heart of the city.</p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Explore Our Hotel</h2>
          <div className="row g-4">
            {navItems.map((item, index) => (
              <div key={index} className="col-md-4">
                <Link to={item.link} className="text-decoration-none text-reset">
                  <div className="card h-100 border-0 shadow-sm hover-lift">
                    <div className="card-img-container" style={{ height: "200px", overflow: "hidden" }}>
                      <img 
                        src={item.image} 
                        className="card-img-top h-100 w-100" 
                        alt={item.title}
                        style={{ objectFit: 'cover' }}
                        onError={(e) => e.currentTarget.src = item.fallbackImage || '/images/hotel-exterior.jpg'}
                        loading="lazy"
                      />
                    </div>
                    <div className="card-body text-center">
                      <h3 className="h5 card-title mb-2">{item.title}</h3>
                      <p className="card-text text-muted">{item.description}</p>
                      <span className="text-primary">Learn more →</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Location</h2>
          <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm">
            <iframe
              title="Hotel Grand Regal Location"
              src={`https://www.google.com/maps?q=${encodeURIComponent("123 Grand Regal Street, City")}&output=embed`}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
