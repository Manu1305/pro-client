import React from "react";
import video from  "./CustomerVideo.module.css";
// import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormPrevious } from "react-icons/gr"
import { MdForkLeft, MdNavigateNext } from "react-icons/md"
const CustomPrevArrow=(props)=> {
  const { onClick } = props
  return (
    <div className={video['control-btn']} onClick={onClick}>
      <button className={video.prev}>
        <GrFormPrevious className={video.icon} />
      </button>
    </div>
  )
  // const { onClick } = props;
  // return (
  //   <div className="slick-arrow custom-prev-arrow" onClick={onClick}>
  //     <i className="fa fa-chevron-left" style={{ color: "red" }}></i>
  //   </div>
  // );
}

const CustomNextArrow=(props) =>{
  const { onClick } = props
  return (
    <div className={video['control-btn']} onClick={onClick}>
      <button className={video.next}>
        <MdNavigateNext className={video.icon}/>
      </button>
    </div>
  )
}

export const CustomerReview=() =>{
 const settings = {
   dots: false,
  
   speed: 500,
   slidesToShow: 3,
   slidesToScroll: 1,
   prevArrow: <CustomPrevArrow />,
   nextArrow: <CustomNextArrow />,
   responsive: [
     {
      height:500,
       breakpoint: 768,
       settings: {
         slidesToShow: 1    ,
         slidesToScroll: 1, 
         infinite: true,
         dots: false,
       },
     },
     {
       breakpoint: 768,
       settings: {
         slidesToShow: 1,
         slidesToScroll: 1,
       },
     },
   ],
 };


//   const { onClick } = props;
//   return (
//     <div className="slick-arrow custom-next-arrow" onClick={onClick}>
//       <i className="fa fa-chevron-right" style={{ color: "red" }}></i>
//     </div>
//   );
// }


  const reviews = [
    {
      id: 1,
      videoUrl: "../Video/pexels-frank-cone-3194277-1920x1080-30fps.mp4",
      name: "manu",
      location: "banglore",
    },
    {
      id: 2,
      videoUrl: "../Video/Video3.mp4",
      name: "customer2",
      location: "banglore",
    },
    {
      id: 3,
      videoUrl: "../Video/Video4.mp4",
      name: "customer3",
      location: "kerala",
    },
    {
      id: 4,
      videoUrl: "../Video/Video2.mp4",
      name: "customer4",
      location: "tamilnadu",
    },
  ];

  return (
    <div
      className={video.bgggg}
    >
  
      <h1 className="customerheading text-center mb-4">Our Customer Says !</h1>
      <div className={video.videoContainer}>
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className="col-md-4 mb-4">
            <div className="embed-responsive embed-responsive-16by9">
              <video
                className={video["embed-responsive-item"]}
                src={review.videoUrl}
                title={`Customer Review ${review.id}`}
                allowFullScreen
                muted
                autoPlay="autoplay"
              ></video>
              <div  className={video["img-overlay"]}>
              <h3>{review.name}</h3>
              <h5>{review.location}</h5>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
}

// export default CustomerReview;
