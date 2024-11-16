const TeamMember = ({ image, name, role}) => {
    return (
      <div
      className="col-lg-3 col-md-6 wow animated fadeInUp"
      data-wow-duration="2000ms"
      data-wow-delay="200ms"  // Fixed delay for all items
    >
      <div className="appie-single-service text-center mt-30">
        <img
              src={image}
              alt={name}
              className="card-img-top"
              style={{
                width: '100%', // Fully responsive width
                height: '70%', // Fixed height
                objectFit: 'contain', // Full image visibility
              }}
            />
        
        <div className="card-body text-center">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{role}</p>
            </div>
      </div>
    </div>
    );
  };
  
  export default TeamMember;
  
