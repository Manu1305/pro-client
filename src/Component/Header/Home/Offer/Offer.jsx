import React from "react"
import  offer from "./Offer.module.css"
import { category } from "./data"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { GrFormPrevious } from "react-icons/gr"
import { MdNavigateNext } from "react-icons/md"

 const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className={offer['control-btn']} onClick={onClick}>
      <button className={offer.next}>
        <MdNavigateNext className={offer.icon} />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className={offer['control-btn']}onClick={onClick}>
      <button className={offer.prev}>
        <GrFormPrevious className={offer.icon} />
      </button>
    </div>
  )
}
export const Offer = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay:true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }

  return (
    <>
    {/* <div className="yoyo"> */}
      <section className={offer.category}>
        <div className={offer.content}>
          <Slider {...settings}>
            {category.map((item) => (
              <div className={offer.boxs}>
                <div className={offer.box} key={item.id}>
                  <img src={item.cover} alt='cover' />
                  <div className={offer.overlay}>
                    <h4>{item.category}</h4>
                    <p>{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      {/* </div> */}
    </>
  )
}