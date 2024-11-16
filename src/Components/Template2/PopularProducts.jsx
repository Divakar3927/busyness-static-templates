import { useEffect,useState } from 'react';
import TeamMember from './ProductCard';
function PopularProducts() {
    const formData1 = {
      title: 'Our Most Loved Products',
      description: 'These are the products that are most loved by our customers',
    }
    const nestedImages1 = [
      {
        imageUrl: "src/assets/images/fresh.jpg",
        name: "Fresh and Qualified",
        rating: 4.5
      },
      {
        imageUrl: "src/assets/images/products.png",
        name: "Product Variety and Quality",
        rating: 4.6
      },
      {
        imageUrl: "src/assets/images/clean.jpg",
        name: "Organized Environment",
        rating: 4.7
      },
      {
        imageUrl: "src/assets/images/customer.jpg",
        name: "Customer Services",
        rating: 4.8
      }
    ]; 
    return (
        <>
            <section id='Products' className={"appie-team-area pt-40 pb-100 position-relative"} >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">
                                    {formData1.title}
                                    </h3>
                                <p>
                                    {formData1.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {nestedImages1.map((image) => (
                            <TeamMember
                                key={image.name}
                                image={image.imageUrl}
                                name={image.name}
                                role={image.rating}
                                delay="200ms"
                            />
                        ))}    
                    </div>
                <div className="team-btn text-center mt-70" style={{ display: 'flex', justifyContent: 'center' }}>
                        <a 
                            href="#" 
                            style={{
                                backgroundColor: 'black', // Black color initially
                                color: 'white', // White text
                                textDecoration: 'none', // Remove underline
                                padding: '10px 20px', // Add some padding
                                borderRadius: '5px', // Rounded corners
                                transition: 'background-color 0.3s ease, color 0.3s ease' // Smooth transition
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#007bff'; // Blue background on hover
                                e.currentTarget.style.color = 'white'; // Keep text white on hover
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'black'; // Return to black
                                e.currentTarget.style.color = 'white'; // Keep text white
                            }}
                        >
                            Order Now <i className="fal fa-arrow-right" />
                        </a>
                    </div>
                    </div>
            </section>
        </>
    );
}

export default PopularProducts;
