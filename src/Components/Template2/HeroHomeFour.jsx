import Hero_bg from '../../assets/backgrounds/1_bg.png'
import { Button, useMediaQuery } from '@mui/material';

const HeroHomeFour = ()=>{
    const isMediumScreen = useMediaQuery('(max-width: 768px)');
  const formData = {
    title1: 'Make healthy life with',
    title2: 'fresh grocery',
    description: 'Get the best quality and most delicious grocery food in the world. Fresh grocery delivered every day to your family.',
    title2Org: '',
    subheading: '',
  }
    return (
        <>
            <section style={{ backgroundImage: `url(${Hero_bg})`, backgroundSize: 'cover' }} className='tw-pt-24 tw-mt-3 pb-40 bg-green-300/10'>
            <div className="container mt-80">
              <div className="row align-items-center">
                 <div className="col-lg-6">
                   <div className="appie-hero-content">
                         <h1 className="tw-font-bold tw-capitalize tw-text-3xl sm:tw-text-2xl md:tw-text-3xl lg:tw-text-4xl xl:tw-text-5xl xl:tw-tracking-wide">
                                {formData.title1}<br />
                            <div className="tw-my-1 xl:tw-my-2.5 lg:tw-my-1.5 md:tw-my-0.5">
                              <span className="tw-text-green-500">{formData.title2}</span>
                            </div>
                        </h1>
                    {/* Description */}
                    <p className="tw-text-sm sm:tw-text-xs md:tw-text-sm lg:tw-text-base">
                        {formData.description}
                    </p>
                                
                        {/* Shop Now Button */}
                        <Button
                            sx={{ textTransform: 'capitalize' }}
                            variant="contained"
                            size={isMediumScreen ? 'medium' : 'large'}
                            color="success"
                        >
                            Shop Now
                        </Button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="appie-hero-thumb ms-lg-4">
                <span className="phone-image" data-depth="0.2">
                    
                      <img
                        src="src/assets/images/1Hero-removebg-preview.png"
                        alt="image_not_found"
                        style={{maxHeight:'500px'}}
                      />
                    
                  </span> 
              </div>
            </div>
          </div>
        </div>
        </section>
        </>
    );
}
export default HeroHomeFour
