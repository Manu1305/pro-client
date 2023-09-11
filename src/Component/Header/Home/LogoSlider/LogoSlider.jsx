import React, { useRef } from "react";
import logo from "./LogoSlider.module.css";
import Slider from "react-slick";

export const  Logoslider=()=> {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // time in milliseconds
    cssEase: "linear",
    swipeToSlide: false,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={logo.container}>
      <h2 className={logo.hhhhaa}>Our PARTNERS</h2>
      <Slider {...settings} ref={sliderRef}>
        <div className={logo.slide} style={{ height: 50, borderRadius: 50 }}>
          <img
            src="data:image/png;base64,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"
            style={{ height: 150, width: "50%", borderRadius: "50%" }}
          />
        </div>
        <div className={logo.slide} style={{ height: 50, borderRadius: 50 }}>
          <img
            src="https://dtbtob4osa700.cloudfront.net/BrandsImages/22022022162645960_brlo.png"
            style={{ height: 150, width: "50%", borderRadius: "50%" }}
          />
        </div>
        <div className={logo.slide} style={{ height: 50, borderRadius: 50 }}>
          <img
            src="https://assets.turbologo.ru/blog/ru/2019/12/18163325/3-poloski-adidas-logo.png"
            style={{ height: 150, width: "50%", borderRadius: "50%" }}
          />
        </div>
        <div className={logo.slide} style={{ height: 50, borderRadius: 50 }}>
          <img
            src="https://pbs.twimg.com/profile_images/1575795470248689671/yaUf2Ac0_400x400.jpg"
            style={{ height: 150, width: "50%", borderRadius: "50%" }}
          />
        </div>
        <div className={logo.slide} style={{ height: 50, borderRadius: 50 }}>
          <img
            src="https://qph.cf2.quoracdn.net/main-qimg-b90d6cf9accb2e256e2d2090a981da5d-lq"
            style={{ height: 150, width: "50%", borderRadius: "50%" }}
          />
        </div>
        <div className={logo.slide} style={{ height: 50, borderRadius: 50 }}>
          <img
            src="https://licenceindia.s3.ap-south-1.amazonaws.com/s3fs-public/news27novstep10licenseindia1026455dde854ea93f1.jpg"
            style={{ height: 150, width: "50%", borderRadius: "50%" }}
          />
        </div>
        <div className={logo.slide} style={{ height: 50, borderRadius: 50 }}>
          <img
            src="https://image.freepik.com/free-vector/background-of-spots-halftone_1035-3847.jpg"
            style={{ height: 150, width: "50%", borderRadius: "50%" }}
          />
        </div>
      </Slider>
    </div>
  );
}

// export default Logoslider;
