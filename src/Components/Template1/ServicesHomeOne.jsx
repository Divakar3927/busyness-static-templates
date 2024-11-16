function ServicesHomeOne() {
  const formData = {
    title: "Services We Provide",
    subheading: "Providing seamless car rental services, tailored for every journey and need."
  };

  const nestedImages = [
    {
      imageUrl: "src/assets/images/fresh.jpg",
      subtext: "Ensuring fruits, vegetables, meats, and dairy are consistently fresh and well-stocked.",
      name: "Fresh and Qualified",
    },
    {
      imageUrl: "src/assets/images/products.png",
      subtext: "Providing fast checkout options, helpful staff, and responsive customer support.",
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
  ];
    return (
        <section id="Service" className={`appie-service-area pt-60 pb-100 position-relative`} >

        


<div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="appie-section-title text-center">
            <h3 className="appie-title">{formData.title}</h3>
            <p>{formData.subheading}</p>
          </div>
        </div>
      </div>
      <div className="row">
        {nestedImages.map((image, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div 
              className={`appie-single-service text-center mt-30 item-${index + 1} wow animated fadeInUp`} 
              data-wow-duration="2000ms" 
              data-wow-delay={`${(index + 1) * 200}ms`}
            >
              <div className="icon">
                <img src={image.imageUrl} alt={`icon-${index + 1}`} />
              </div>
              <h4 className="appie-title">{image.name}</h4>
              <p>{image.subtext}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

        </section>
    );
}

export default ServicesHomeOne;
