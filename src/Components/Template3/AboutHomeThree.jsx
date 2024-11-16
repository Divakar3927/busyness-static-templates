import React from 'react';
function AboutHomeThree() {
    return (
        <>
            <section className="appie-about-3-area pt-180 pb-100 position-relative aboutus-custom-class" id="about-us">
                <div  className="container">
                  <div className="row align-items-center">
                    {/* Left Column - Image */}
                    <div className="col-lg-5"> {/* Increased col-lg size for more space */}
                      <div>
                        <img
                          className=" mt-50 mt-lg-3 ml-lg-40 custom-class"
                          src="src/assets/images/aboutus.jpeg"
                          alt="About Us"
                          style={{
                            width: '100%',          // Image takes full width of its container
                            maxWidth: '500px',
                            height: 'auto',         // Maintains aspect ratio
                            maxHeight: '400px', 
                            objectFit: 'contain',     // Keeps image covering the container
                            borderRadius: '10px',   // Optional: Adds rounded corners
                          }}
                        />
                      </div>
                    </div>
                    {/* Right Column - Text Content */}
                    <div className="col-lg-7">
                      
                      <div className="appie-traffic-title aboutus-custom-class1">
                        <h2 className="title">About Us</h2>
                        <h4 className="subheading">Your Trusted One-Stop Shopping</h4>
                        <br />
                      </div>
                      <div className="row ml-10 mr-10">
                        <div className="col-lg-12 about-description">
                          <ul style={{ 
                            listStyleType: 'disc',
                            paddingLeft: '20px',
                            margin: '0',
                            marginLeft: '40px',
                            padding: '0'
                          }}>
                            <li style={{ 
                              marginBottom: '15px', 
                              fontSize: '18px',     
                              lineHeight: '1.5'     
                            }}>
                              At QuickDrive, we believe that renting a car should be easy, affordable, and seamless. Since our founding, we’ve been dedicated to making travel more convenient for both business and leisure travelers. Our wide selection of vehicles is curated to meet the diverse needs of our customers—whether you're looking for a compact car for city driving, a luxury vehicle for a special occasion, or an SUV for a family adventure.
                            </li>
                            <li style={{ 
                              marginBottom: '15px', 
                              fontSize: '18px',     
                              lineHeight: '1.5'     
                            }}>
                              Our mission is to provide reliable and high-quality service, ensuring that every rental experience is stress-free and enjoyable. We pride ourselves on exceptional customer service, always going the extra mile to make sure you're satisfied, whether you're on a weekend getaway or traveling for an important business meeting.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </section>
          </>
        );
}

export default AboutHomeThree;

