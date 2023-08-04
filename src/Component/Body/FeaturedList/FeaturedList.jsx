import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ddata from "./Ddata";
// import Slider from "react-slick"

export const FeaturedList = () => {
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  //   autoplay: true,
  // }

  return (
    <>
      {/* <Slider {...settings} > */}
      {Ddata.map((value, index) => {
        return (
          <>
            <div className="box product" key={index}>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="card">
                      <div className="card-header">
                        {" "}
                        <div className="img">
                          <img src={value.cover} alt="" width="100%" />
                        </div>
                      </div>
                      <div className="card-body">
                        <h4>{value.name}</h4>
                        <p>Investment Range: {value.price}</p>
                        <p>Area Required {value.area}</p>
                        <p>Franchise Outlets {value.outlets}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
      {/* </Slider> */}
    </>
  );
};
