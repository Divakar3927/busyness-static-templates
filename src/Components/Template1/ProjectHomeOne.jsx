function ProjectHomeOne() {
    const formData = {
        titleOrg: 'Diwali',
        title1: 'Special Offerr',
        description1: '25% OFF ON BMWw',
        description2: 'USECODE: BMW25BUSYy',
        imageUrl: 'src/assets/images/biriyani.png',
    }
    return (
        <>
        <section className={`appie-project-area pt-50 pb-150 position-relative`} >
            <div className="container mt-5">
                    {/* Special Offer Heading */}
                    <div className="row mb-4">
                        <div className="col-lg-12 text-center">
                            <h2 className="special-offer-title">
                                <span>
                                    {formData.titleOrg || "Special"} 
                                </span>
                                 {/* Adding a space here  */}
                                {' '}
                                {formData.title1}
                            </h2>
                      </div>
                    </div>

                    <div className="row align-items-center appie-project-box pt-10"
                      style={{
                        backgroundImage: `url("https://busynesss3practise.s3.ap-south-1.amazonaws.com/Orange+Easter+Sale+Facebook+Fundraiser+Cover+Photo+(1)/24.png")`,
                        backgroundSize: 'cover',     // Ensures the image covers the entire section
                        backgroundPosition: 'center' // Centers the image within the section
                    }}>
                        {/* Adjust column order based on screen size */}
                        <div className="col-lg-6 order-lg-1 order-2">
                            <div className="appie-project-content">
                                <h3 className="title">
                                    {formData.description1 || "Get 25% off on fruits"}
                                </h3>
                                <p>
                                    {formData.description2 || "Download the app & order now"}
                                </p>
                                <div className="team-btn mt-50">
                                    <a className="main-btn" href="#">
                                        <span style={{ fontWeight: 'bold', color: '#fff' }}>Order Now</span>
                                        <i className="fal fa-arrow-right"  style={{ color: '#fff' }}/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="col-lg-6 order-lg-2 order-1 text-center">
                            <div className="appie-project-thumb mt-3">
                                <img
                                    src={formData.imageUrl || "/path-to-your-image.jpg"}
                                    alt="Offer Image"
                                    className="img-fluid responsive-img"
                                    style={{ maxHeight: '300px', maxWidth: '550px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProjectHomeOne;
