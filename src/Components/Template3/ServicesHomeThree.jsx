import React from 'react';
function ServicesHomeThree() { 
    return (
        <>
            <section className="appie-service-area appie-service-3-area pt-195 pb-100 mt-130 service-custom-class" id="servicepage">
            
                <div className="container" style={{ margin: 'auto' }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">Our Services</h3>
                                <p>Providing seamless car rental services, tailored for every journey and need.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {[
                            {
                                imageUrl: "src/assets/images/fresh.jpg",
                                subtext: "Ensuring fruits, vegetables, meats, and dairy are consistently fresh and well-stocked.",
                                name: "Fresh and Updated",
                            },
                            {
                                imageUrl: "src/assets/images/products.png",
                                subtext: "Explore a wide range of fresh and high-quality products at our supermarket from everyday essentials to gourmet items.",
                                name: "Product Variety and Quality",
                            },
                            {
                                imageUrl: "src/assets/images/clean.jpg",
                                subtext: "Maintaining a well-organized, clean, and safe store layout for an easy shopping experience.",
                                name: "Organized Shopping Environment",
                            },
                            {
                                imageUrl: "src/assets/images/customer.jpg",
                                subtext: "Providing fast checkout options, helpful staff, and responsive customer support.",
                                name: "Customer Services",
                            }
                        ].map((image, index) => (
                            <div className="col-lg-3 col-md-6" key={index}>
                                <div
                                    className="appie-single-service appie-single-services-3 text-center mt-30"
                                    style={{
                                        height: '350px',
                                        overflow: 'hidden',
                                        background: "linear-gradient(135deg, #f7f8fc, #e3e6f1)",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.05)";
                                        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.2)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
                                    }}
                                >
                                    <div className="icon" style={{ marginBottom: "15px" }}>
                                        <img
                                            src={image.imageUrl}
                                            alt=""
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
                                            }}
                                        />
                                    </div>
                                    <h4 className="appie-title" style={{ fontSize: "18px", fontWeight: "600", color: "#333", minHeight: "50px", overflow: "hidden" }}>
                                        {image.name}
                                    </h4>
                                    <p style={{ color: "#666", minHeight: "80px", overflow: "hidden", marginBottom: 0 }}>{image.subtext}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </section>
        </>
    );
}

export default ServicesHomeThree;















