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
      <h2>Our Partners</h2>
      <Slider {...settings} ref={sliderRef}>
        <div className={logo.slide} style={{ height: 50, borderRadius: 50 }}>
          <img
            src="https://itsbest10.com/wp-content/uploads/2020/11/allen-solly1.png"
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYuf12YNmWWmGUDcqxM8LZYBdnMAQfz2deCu_BbPPvMC26sxeMjou7jzpVSBtVjhxk6xU&usqp=CAU"
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
