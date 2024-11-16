function TrafficHomeOne() {
  const product = {
    title: "About Us",
    subheading: "Your Trusted One-Stop Shopping",
    descriptionOne: `At QuickDrive, we believe that renting a car should be easy, affordable, and seamless. Since our founding, we’ve been dedicated to making travel more convenient for both business and leisure travelers. Our wide selection of vehicles is curated to meet the diverse needs of our customers—whether you're looking for a compact car for city driving, a luxury vehicle for a special occasion, or an SUV for a family adventure.`,
    descriptionTwo: `Our mission is to provide reliable and high-quality service, ensuring that every rental experience is stress-free and enjoyable. We pride ourselves on exceptional customer service, always going the extra mile to make sure you're satisfied, whether you're on a weekend getaway or traveling for an important business meeting.`,
    imageUrl: "src/assets/images/about-thumb-5.png"
  };
  return (
        <section id="about-us" className={`appie-traffic-area pt-120 pb-150 position-relative`}>
        <div className="container pb-5" style={{ fontFamily: "'Roboto', sans-serif" }}>
            <div className="row align-items-center">

              {/* Centered Title */}
              <div className="col-12 text-center mb-5">
                <h2 className="display-5 font-weight-bold text-dark">{product.title}</h2>
                <h4 className="text-muted mb-3">{product.subheading}</h4>
              </div>

              {/* Left Column - Text Content */}
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="about-description">
                  <ul>
                    <li className="mb-3" style={{ fontSize: '18px', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                      {product.descriptionOne}
                    </li>
                    <li className="mb-3" style={{ fontSize: '18px', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                      {product.descriptionTwo}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Responsive Image with Left Margin on Large Screens */}
              <div className="col-lg-5 text-center mb-4 mb-lg-0 ml-lg-5">
                <img
                  src={product.imageUrl}
                  alt="About Us"
                  className="img-fluid rounded"
                  style={{
                    maxWidth: '100%',     // Full width within its container
                    maxHeight: '400px',    // Ensures image doesn't become too tall
                    objectFit: 'cover',    // Crops or scales as needed to fill container
                  }}
                />
              </div>

            </div>
          </div>
    </section>
  );
}

export default TrafficHomeOne;
