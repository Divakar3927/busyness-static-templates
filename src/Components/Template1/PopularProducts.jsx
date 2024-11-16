import TeamMember from './ProductCard';
function TeamHomeOne({bg}) {
    const formData = {
      title: "Products Card Title",
      description: "Products Card Page Description."
    };
  
    const nestedImages = [
      {
        imageUrl: "src/assets/images/bg-4.jpg",
        subtext: "Ensuring fruits, vegetables, meats, and dairy are consistently fresh and well-stocked.",
        name: "New Luffy",
        rating: 4.8
      },
      {
        imageUrl: "src/assets/images/bg-2.jpg",
        subtext: "Providing fast checkout options, helpful staff, and responsive customer support.",
        name: "Rahul",
        rating: 4.9
      },
      {
        imageUrl: "src/assets/images/bg-3.jpg",
        subtext: "Maintaining a well-organized, clean, and safe store layout for an easy shopping experience.",
        name: "Tandoori Chicken",
        rating: 4.9
      },
      {
        imageUrl: "src/assets/images/bg-1.jpg",
        subtext: "Providing fast checkout options, helpful staff, and responsive customer support.",
        name: "Chicken 65",
        rating: 4.3
      }
    ];
    (
        <>
          <section id='Products' className={"appie-team-area pt-40 pb-100 position-relative"} style={{ backgroundColor: `${bg}` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">
                                    {/* Meet our Team Members */}
                                    {formData.title}
                                    </h3>
                                <p>
                                    {/* Different layouts and styles for team sections. */}
                                    {formData.description}

                                    </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {nestedImages.map((image) => (
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
                            Order Now<i className="fal fa-arrow-right" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
export default TeamHomeOne;
